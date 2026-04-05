import FormField, { Input, Select } from '../components/FormField.jsx'

const childOptions = [
  { value: '0', label: '无未成年子女' },
  { value: '1', label: '1个' },
  { value: '2', label: '2个' },
  { value: '3', label: '3个' },
  { value: '4', label: '4个' },
  { value: '5', label: '5个' },
]

export default function StartStep({ formData, onChange, errors }) {
  return (
    <div>
      <p className="step-desc">请填写以下信息，系统将为您生成专属的草稿链接，方便您随时保存和继续填写。</p>

      <FormField label="您的电子邮箱" required error={errors?.email}>
        <Input
          type="email"
          value={formData.email}
          onChange={v => onChange('email', v)}
          placeholder="example@email.com"
        />
        <p className="field-hint">草稿链接将发送到此邮箱，请确保填写正确</p>
      </FormField>

      <FormField label="是否有副申请人（配偶或同居伴侣）？" required error={errors?.hasCoApplicant}>
        <div className="radio-group">
          <label className="radio-label">
            <input type="radio" checked={formData.hasCoApplicant === true} onChange={() => onChange('hasCoApplicant', true)} />
            是
          </label>
          <label className="radio-label">
            <input type="radio" checked={formData.hasCoApplicant === false} onChange={() => onChange('hasCoApplicant', false)} />
            否
          </label>
        </div>
      </FormField>

      <FormField label="未成年子女数量（18岁以下）" required error={errors?.numberOfMinorChildren}>
        <Select
          value={String(formData.numberOfMinorChildren)}
          onChange={v => onChange('numberOfMinorChildren', parseInt(v))}
          options={childOptions}
        />
      </FormField>

      <FormField label="是否有18-22岁的成年子女需要一同申请？" required error={errors?.hasAdultChildren}>
        <div className="radio-group">
          <label className="radio-label">
            <input type="radio" checked={formData.hasAdultChildren === true} onChange={() => onChange('hasAdultChildren', true)} />
            是
          </label>
          <label className="radio-label">
            <input type="radio" checked={formData.hasAdultChildren === false} onChange={() => onChange('hasAdultChildren', false)} />
            否
          </label>
        </div>
      </FormField>
    </div>
  )
}

export function validateStart(formData) {
  const errors = {}
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = '请填写有效的邮箱地址'
  }
  if (formData.hasCoApplicant === null || formData.hasCoApplicant === undefined) {
    errors.hasCoApplicant = '请选择'
  }
  if (formData.hasAdultChildren === null || formData.hasAdultChildren === undefined) {
    errors.hasAdultChildren = '请选择'
  }
  return errors
}
