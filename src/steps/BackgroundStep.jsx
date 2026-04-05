import FormField, { RadioGroup, Textarea } from '../components/FormField.jsx'

const questions = [
  '是否曾在加拿大被判有犯罪行为，且根据加拿大刑事记录法未获得赦免？',
  '是否曾经被判犯有罪行，或者目前：正在接受起诉/是犯罪行为或者违规行为的当事人/是任何其他国家或地区的刑事诉讼对象？',
  '是否曾在加拿大或加拿大境外的加拿大签证办事处或任何其他国家或地区或联合国难民署（UNHCR）提出过难民保护申请？',
  '是否曾被拒绝难民身份、移民或永久居民签证（包括魁北克省选拔证书CSQ或省提名计划的申请）或加拿大/任何其他国家或地区的访问者或临时居民签证？',
  '是否曾被拒绝入境加拿大或任何其他国家或地区，或被要求离开（美加边境flagpole也算）？',
  '是否曾参与种族灭绝、战争罪行或犯下反人类罪行为？',
  '是否曾使用、计划或倡导使用武装斗争或暴力手段来达到政治、宗教或社会目标？',
  '是否曾与使用、使用过、倡导或倡导使用武装斗争或暴力手段来达到政治、宗教或社会目标的团体有过关联？',
  '是否曾是从事与犯罪活动模式的组织的成员？',
  '是否曾被拘留、监禁或关进监狱？',
  '是否曾患有严重疾病或身体或精神障碍？',
]

const yesNoOptions = [
  { value: '否', label: '否' },
  { value: '是', label: '是' },
]

function PersonBackground({ title, dataKey, data, onChange, errors, showAdultChildren }) {
  function set(field, value) {
    onChange(dataKey, { ...data, [field]: value })
  }

  return (
    <div className="background-person">
      <h3 className="person-title">{title}</h3>
      {questions.map((q, i) => (
        <FormField key={i} label={`${i + 1}. ${q}`} required error={errors?.[`q${i + 1}`]}>
          <RadioGroup
            value={data?.[`q${i + 1}`]}
            onChange={v => set(`q${i + 1}`, v)}
            options={yesNoOptions}
          />
        </FormField>
      ))}
      {showAdultChildren && (
        <FormField label="18-22岁子女" required error={errors?.qChild}>
          <RadioGroup
            value={data?.qChild}
            onChange={v => set('qChild', v)}
            options={yesNoOptions}
          />
        </FormField>
      )}
      <FormField label={'如果上述问题选了"是"，请在此提供具体情况说明'}>
        <Textarea
          value={data?.details}
          onChange={v => set('details', v)}
          placeholder="请详细描述（无则留空）"
          rows={4}
        />
      </FormField>
    </div>
  )
}

export default function BackgroundStep({ formData, onChange, errors, hasCoApplicant, hasAdultChildren }) {
  const bg = formData.background || {}

  function setBg(key, value) {
    onChange('background', { ...bg, [key]: value })
  }

  return (
    <div>
      <p className="step-desc">请如实回答以下背景问题。虚假陈述后果非常严重，请务必如实填写。</p>

      <PersonBackground
        title="主申请人"
        dataKey="main"
        data={bg.main}
        onChange={setBg}
        errors={errors?.main}
      />

      {hasCoApplicant && (
        <PersonBackground
          title="副申请人"
          dataKey="co"
          data={bg.co}
          onChange={setBg}
          errors={errors?.co}
        />
      )}

      {hasAdultChildren && (
        <PersonBackground
          title="18-22岁子女"
          dataKey="adultChildren"
          data={bg.adultChildren}
          onChange={setBg}
          errors={errors?.adultChildren}
          showAdultChildren={false}
        />
      )}
    </div>
  )
}

export function validateBackground(formData, hasCoApplicant, hasAdultChildren) {
  const bg = formData.background || {}
  const errors = {}

  function validatePerson(data) {
    const e = {}
    for (let i = 1; i <= 11; i++) {
      if (!data?.[`q${i}`]) e[`q${i}`] = '请选择'
    }
    return Object.keys(e).length > 0 ? e : null
  }

  const mainErr = validatePerson(bg.main)
  if (mainErr) errors.main = mainErr

  if (hasCoApplicant) {
    const coErr = validatePerson(bg.co)
    if (coErr) errors.co = coErr
  }

  if (hasAdultChildren) {
    const acErr = validatePerson(bg.adultChildren)
    if (acErr) errors.adultChildren = acErr
  }

  return errors
}
