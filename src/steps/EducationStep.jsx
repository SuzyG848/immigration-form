import FormField, { Input, Select } from '../components/FormField.jsx'
import RepeatableSection from '../components/RepeatableSection.jsx'

const degreeOptions = [
  { value: '博士', label: '博士' },
  { value: '硕士', label: '硕士' },
  { value: '研究生文凭', label: '研究生文凭' },
  { value: '本科', label: '本科' },
  { value: '大专', label: '大专' },
  { value: '中专', label: '中专' },
  { value: '高中', label: '高中' },
  { value: '初中', label: '初中' },
]

const typeOptions = [
  { value: '全日制', label: '全日制（Full time）' },
  { value: '半工读', label: '半工读（Part time）' },
  { value: '自考', label: '自考' },
  { value: '电大', label: '电大' },
  { value: '函授', label: '函授' },
  { value: '成人高考', label: '成人高考' },
  { value: '党校', label: '党校' },
]

const emptyEntry = {
  schoolCn: '', schoolEn: '', degree: '', type: '',
  startDate: '', endDate: '', degreeName: '', major: '', city: ''
}

export default function EducationStep({ person, formData, onChange, errors }) {
  const dataKey = person === 'main' ? 'mainEducation' : 'coEducation'
  const title = person === 'main' ? '主申请人' : '副申请人'
  const data = formData[dataKey] || { totalYears: '', entries: [] }
  const err = errors?.[dataKey] || {}

  function set(field, value) {
    onChange(dataKey, { ...data, [field]: value })
  }

  return (
    <div>
      <p className="step-desc">{title}教育历史（从最高学历写起到初中）</p>

      <FormField label="所有受教育时长合计（年）" required error={err.totalYears}
        hint="从小学到最高学历所有参加过的教育时长总和">
        <Input value={data.totalYears} onChange={v => set('totalYears', v)} placeholder="例：16" />
      </FormField>

      <RepeatableSection
        items={data.entries}
        onChange={entries => set('entries', entries)}
        minItems={1}
        maxItems={8}
        emptyItem={emptyEntry}
        addLabel="+ 添加一段教育经历"
        renderItem={(item, index, update) => (
          <div>
            <div className="field-row">
              <FormField label="院校中文名称" required>
                <Input value={item.schoolCn} onChange={v => update('schoolCn', v)} placeholder="北京大学" />
              </FormField>
              <FormField label="院校英文名称（如有）">
                <Input value={item.schoolEn} onChange={v => update('schoolEn', v)} placeholder="Peking University" />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="学历" required>
                <Select value={item.degree} onChange={v => update('degree', v)} options={degreeOptions} />
              </FormField>
              <FormField label="类型" required>
                <Select value={item.type} onChange={v => update('type', v)} options={typeOptions} />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="入学年月日" required hint="YYYY-MM-DD">
                <Input value={item.startDate} onChange={v => update('startDate', v)} placeholder="2010-09-01" />
              </FormField>
              <FormField label="毕业年月日" required hint="YYYY-MM-DD">
                <Input value={item.endDate} onChange={v => update('endDate', v)} placeholder="2014-07-01" />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="学位名称（中英文）">
                <Input value={item.degreeName} onChange={v => update('degreeName', v)} placeholder="理学学士 / Bachelor of Science" />
              </FormField>
              <FormField label="专业（中英文）">
                <Input value={item.major} onChange={v => update('major', v)} placeholder="计算机科学 / Computer Science" />
              </FormField>
            </div>
            <FormField label="就读城市" required>
              <Input value={item.city} onChange={v => update('city', v)} placeholder="北京" />
            </FormField>
          </div>
        )}
      />
    </div>
  )
}

export function validateEducation(formData, person) {
  const dataKey = person === 'main' ? 'mainEducation' : 'coEducation'
  const data = formData[dataKey] || {}
  const errors = {}
  if (!data.totalYears) errors.totalYears = '此项为必填'
  if (!data.entries || data.entries.length === 0) errors.entries = '请至少填写一段教育经历'
  return Object.keys(errors).length > 0 ? { [dataKey]: errors } : {}
}
