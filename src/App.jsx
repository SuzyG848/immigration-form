import { useState, useEffect, useCallback } from 'react'
import { loadDraft, saveDraft, submitForm } from './lib/supabase.js'
import { sendNotification } from './lib/emailjs.js'
import ProgressBar from './components/ProgressBar.jsx'
import StartStep, { validateStart } from './steps/StartStep.jsx'
import PersonalInfoStep, { validatePersonal } from './steps/PersonalInfoStep.jsx'
import BackgroundStep, { validateBackground } from './steps/BackgroundStep.jsx'
import EducationStep, { validateEducation } from './steps/EducationStep.jsx'
import WorkStep, { validateWork } from './steps/WorkStep.jsx'
import FamilyStep from './steps/FamilyStep.jsx'
import ResidenceStep from './steps/ResidenceStep.jsx'
import PersonalHistoryStep from './steps/PersonalHistoryStep.jsx'
import OrgStep from './steps/OrgStep.jsx'
import GovtStep from './steps/GovtStep.jsx'
import MilitaryStep from './steps/MilitaryStep.jsx'
import TravelStep from './steps/TravelStep.jsx'
import AdultChildrenStep from './steps/AdultChildrenStep.jsx'
import ReviewStep from './steps/ReviewStep.jsx'

function generateToken() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

function getTokenFromUrl() {
  const params = new URLSearchParams(window.location.search)
  return params.get('token')
}

function setTokenInUrl(token) {
  const url = new URL(window.location)
  url.searchParams.set('token', token)
  window.history.replaceState({}, '', url)
}

const initialFormData = {
  email: '',
  hasCoApplicant: null,
  numberOfMinorChildren: 0,
  hasAdultChildren: null,
  mainBasic: {},
  coBasic: {},
  background: {},
  mainEducation: { totalYears: '', entries: [] },
  coEducation: { totalYears: '', entries: [] },
  mainWork: [],
  coWork: [],
  mainFamily: [],
  coFamily: [],
  mainResidence: [],
  coResidence: [],
  mainPersonalHistory: [],
  coPersonalHistory: [],
  mainOrg: [],
  coOrg: [],
  mainGovt: [],
  coGovt: [],
  mainMilitary: [],
  coMilitary: [],
  mainTravel: [],
  coTravel: [],
  adultChildrenTravel: [],
  adultChildren: { work: [], residence: [], education: [] },
}

// Add children data keys dynamically
for (let i = 0; i < 5; i++) {
  initialFormData[`child${i}`] = {}
}

export default function App() {
  const [token, setToken] = useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const [currentStep, setCurrentStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saveMsg, setSaveMsg] = useState('')

  // Load draft on mount
  useEffect(() => {
    async function init() {
      const urlToken = getTokenFromUrl()
      if (urlToken) {
        const draft = await loadDraft(urlToken)
        if (draft) {
          setToken(urlToken)
          setFormData(prev => ({ ...prev, ...draft.form_data }))
          if (draft.status === 'submitted') setSubmitted(true)
        } else {
          // Token not found, start fresh
          const newToken = generateToken()
          setToken(newToken)
          setTokenInUrl(newToken)
        }
      } else {
        const newToken = generateToken()
        setToken(newToken)
        setTokenInUrl(newToken)
      }
      setLoading(false)
    }
    init()
  }, [])

  // Build dynamic step list
  function getSteps(fd) {
    const steps = []

    steps.push({ id: 'start', title: '开始', component: 'start' })
    steps.push({ id: 'main-basic', title: '主申-基本信息', component: 'main-basic' })

    if (fd.hasCoApplicant) {
      steps.push({ id: 'co-basic', title: '副申-基本信息', component: 'co-basic' })
    }

    for (let i = 0; i < (fd.numberOfMinorChildren || 0); i++) {
      steps.push({ id: `child-${i}`, title: `子女${i + 1}-基本信息`, component: `child-${i}` })
    }

    steps.push({ id: 'background', title: '背景申报', component: 'background' })
    steps.push({ id: 'main-edu', title: '主申-教育', component: 'main-edu' })

    if (fd.hasCoApplicant) {
      steps.push({ id: 'co-edu', title: '副申-教育', component: 'co-edu' })
    }

    steps.push({ id: 'main-work', title: '主申-工作', component: 'main-work' })

    if (fd.hasCoApplicant) {
      steps.push({ id: 'co-work', title: '副申-工作', component: 'co-work' })
    }

    steps.push({ id: 'family', title: '亲属信息', component: 'family' })
    steps.push({ id: 'residence', title: '居住历史', component: 'residence' })
    steps.push({ id: 'personal-history', title: '个人历史', component: 'personal-history' })
    steps.push({ id: 'org', title: '组织成员', component: 'org' })
    steps.push({ id: 'govt', title: '公职情况', component: 'govt' })
    steps.push({ id: 'military', title: '服役情况', component: 'military' })
    steps.push({ id: 'travel', title: '出入境记录', component: 'travel' })

    if (fd.hasAdultChildren) {
      steps.push({ id: 'adult-children', title: '成年子女信息', component: 'adult-children' })
    }

    steps.push({ id: 'review', title: '确认提交', component: 'review' })

    return steps
  }

  const steps = getSteps(formData)
  const step = steps[currentStep]

  function handleChange(key, value) {
    setFormData(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  function handleStartChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  async function saveProgress(fd) {
    if (!token) return
    setSaving(true)
    await saveDraft(token, fd.email, fd)
    setSaving(false)
    setSaveMsg('草稿已保存')
    setTimeout(() => setSaveMsg(''), 3000)
  }

  function validate() {
    let errs = {}
    const comp = step.component

    if (comp === 'start') {
      errs = validateStart(formData)
    } else if (comp === 'main-basic') {
      const e = validatePersonal(formData, 'mainBasic')
      if (Object.keys(e).length > 0) errs = { mainBasic: e }
    } else if (comp === 'co-basic') {
      const e = validatePersonal(formData, 'coBasic')
      if (Object.keys(e).length > 0) errs = { coBasic: e }
    } else if (comp.startsWith('child-')) {
      const idx = parseInt(comp.split('-')[1])
      const e = validatePersonal(formData, `child${idx}`)
      if (Object.keys(e).length > 0) errs = { [`child${idx}`]: e }
    } else if (comp === 'background') {
      errs = validateBackground(formData, formData.hasCoApplicant, formData.hasAdultChildren)
    } else if (comp === 'main-edu') {
      errs = validateEducation(formData, 'main')
    } else if (comp === 'co-edu') {
      errs = validateEducation(formData, 'co')
    } else if (comp === 'main-work') {
      errs = validateWork(formData, 'main')
    } else if (comp === 'co-work') {
      errs = validateWork(formData, 'co')
    }

    return errs
  }

  async function handleNext() {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setErrors({})
    await saveProgress(formData)
    setCurrentStep(s => Math.min(s + 1, steps.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBack() {
    setErrors({})
    setCurrentStep(s => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit() {
    setSubmitting(true)
    const ok = await submitForm(token, formData.email, formData)
    if (ok) {
      await sendNotification(formData.email)
      setSubmitted(true)
    } else {
      alert('提交失败，请稍后重试')
    }
    setSubmitting(false)
  }

  function renderStep() {
    const comp = step.component
    const props = { formData, onChange: handleChange, errors, hasCoApplicant: formData.hasCoApplicant, hasAdultChildren: formData.hasAdultChildren }

    if (comp === 'start') return <StartStep formData={formData} onChange={handleStartChange} errors={errors} />
    if (comp === 'main-basic') return <PersonalInfoStep person="main" {...props} />
    if (comp === 'co-basic') return <PersonalInfoStep person="co" {...props} />
    if (comp.startsWith('child-')) {
      const idx = parseInt(comp.split('-')[1])
      return <PersonalInfoStep person="child" childIndex={idx} {...props} />
    }
    if (comp === 'background') return <BackgroundStep {...props} />
    if (comp === 'main-edu') return <EducationStep person="main" {...props} />
    if (comp === 'co-edu') return <EducationStep person="co" {...props} />
    if (comp === 'main-work') return <WorkStep person="main" {...props} />
    if (comp === 'co-work') return <WorkStep person="co" {...props} />
    if (comp === 'family') return <FamilyStep {...props} />
    if (comp === 'residence') return <ResidenceStep {...props} />
    if (comp === 'personal-history') return <PersonalHistoryStep {...props} />
    if (comp === 'org') return <OrgStep {...props} />
    if (comp === 'govt') return <GovtStep {...props} />
    if (comp === 'military') return <MilitaryStep {...props} />
    if (comp === 'travel') return <TravelStep {...props} />
    if (comp === 'adult-children') return <AdultChildrenStep {...props} />
    if (comp === 'review') return <ReviewStep formData={formData} onSubmit={handleSubmit} submitting={submitting} />
    return null
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>正在加载...</p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="app">
        <div className="container">
          <div className="success-screen">
            <div className="success-icon">✓</div>
            <h2>提交成功！</h2>
            <p>感谢您填写完整的移民信息表格。</p>
            <p>我们的顾问已收到通知，将尽快与您联系。</p>
            <p className="success-note">您的草稿链接可继续用于查看已提交的信息。</p>
          </div>
        </div>
      </div>
    )
  }

  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="header-title">移民信息采集表</h1>
          {saving && <span className="saving-indicator">保存中...</span>}
          {saveMsg && <span className="save-msg">{saveMsg}</span>}
        </div>
      </header>

      <div className="container">
        <ProgressBar
          current={currentStep + 1}
          total={steps.length}
          title={step.title}
        />

        {Object.keys(errors).length > 0 && (
          <div className="error-banner">
            请填写所有必填项（标有 * 的字段）后再继续
          </div>
        )}

        <div className="step-card">
          <h2 className="step-title">{step.title}</h2>
          {renderStep()}
        </div>

        <div className="nav-buttons">
          {!isFirst && (
            <button className="btn-back" onClick={handleBack}>
              ← 上一步
            </button>
          )}
          {!isLast && (
            <button className="btn-next" onClick={handleNext}>
              下一步 →
            </button>
          )}
        </div>

        <p className="draft-hint">
          草稿已自动保存。如需稍后继续填写，请保存当前页面的网址。
        </p>
      </div>
    </div>
  )
}
