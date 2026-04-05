import FormField, { Input, Select } from '../components/FormField.jsx'
import RepeatableSection from '../components/RepeatableSection.jsx'

const statusOptions = [
  { value: '学习', label: '学习' },
  { value: '工作', label: '工作' },
  { value: '待业', label: '待业' },
  { value: '其他', label: '其他' },
]

const emptyEntry = {
  startDate: '', endDate: '', country: '', province: '', city: '', status: ''
}

function PersonHistory({ title, dataKey, data, onChange }) {
  return (
    <div className="background-person">
      <h3 className="person-title">{title}</h3>
      <p className="step-note">近10年或18岁以后，从最近开始填，时间必须连续，不能与教育、工作城市矛盾。</p>
      <RepeatableSection
        items={data}
        onChange={entries => onChange(dataKey, entries)}
        minItems={1}
        maxItems={12}
        emptyItem={emptyEntry}
        addLabel="+ 添加一段个人历史"
        renderItem={(item, index, update) => (
          <div>
            <div className="field-row">
              <FormField label="起始日期" required hint="YYYY-MM">
                <Input value={item.startDate} onChange={v => update('startDate', v)} placeholder="2015-01" />
              </FormField>
              <FormField label="终止日期" required hint="YYYY-MM，如至今请填写至今">
                <Input value={item.endDate} onChange={v => update('endDate', v)} placeholder="至今 / 2020-06" />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="所在国家" required>
                <Input value={item.country} onChange={v => update('country', v)} placeholder="中国" />
              </FormField>
              <FormField label="省（州）" required>
                <Input value={item.province} onChange={v => update('province', v)} placeholder="北京市" />
              </FormField>
            </div>
            <FormField label="城市" required>
              <Input value={item.city} onChange={v => update('city', v)} placeholder="北京" />
            </FormField>
            <FormField label="个人状态" required>
              <Select value={item.status} onChange={v => update('status', v)} options={statusOptions} />
            </FormField>
          </div>
        )}
      />
    </div>
  )
}

export default function PersonalHistoryStep({ formData, onChange, hasCoApplicant }) {
  return (
    <div>
      <p className="step-desc">近10年或18岁以后的个人历史状态（从最近开始）</p>

      <PersonHistory
        title="主申请人个人历史"
        dataKey="mainPersonalHistory"
        data={formData.mainPersonalHistory || []}
        onChange={onChange}
      />

      {hasCoApplicant && (
        <PersonHistory
          title="副申请人个人历史"
          dataKey="coPersonalHistory"
          data={formData.coPersonalHistory || []}
          onChange={onChange}
        />
      )}
    </div>
  )
}
