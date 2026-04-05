import FormField, { Input } from '../components/FormField.jsx'
import RepeatableSection from '../components/RepeatableSection.jsx'

const emptyEntry = {
  fromDate: '', toDate: '', days: '', country: '', city: '', purpose: ''
}

function PersonTravel({ title, dataKey, data, onChange }) {
  return (
    <div className="background-person">
      <h3 className="person-title">{title}</h3>
      <p className="step-note">请严格参照护照的出入境盖章日期准确填写，从最近的写起。国籍所在国（中国）和常住国家的记录不需要填。如持公务护照出行请标注。</p>
      <RepeatableSection
        items={data}
        onChange={entries => onChange(dataKey, entries)}
        minItems={0}
        maxItems={20}
        emptyItem={emptyEntry}
        addLabel="+ 添加一次出行记录"
        renderItem={(item, index, update) => (
          <div>
            <div className="field-row">
              <FormField label="出发日期" required hint="YYYY-MM-DD">
                <Input value={item.fromDate} onChange={v => update('fromDate', v)} placeholder="2022-07-01" />
              </FormField>
              <FormField label="返回日期" required hint="YYYY-MM-DD">
                <Input value={item.toDate} onChange={v => update('toDate', v)} placeholder="2022-07-15" />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="持续天数">
                <Input value={item.days} onChange={v => update('days', v)} placeholder="14" />
              </FormField>
              <FormField label="国家" required>
                <Input value={item.country} onChange={v => update('country', v)} placeholder="日本" />
              </FormField>
            </div>
            <FormField label="城市/地区" required>
              <Input value={item.city} onChange={v => update('city', v)} placeholder="东京" />
            </FormField>
            <FormField label="出行目的" required>
              <Input value={item.purpose} onChange={v => update('purpose', v)} placeholder="旅游" />
            </FormField>
          </div>
        )}
      />
    </div>
  )
}

export default function TravelStep({ formData, onChange, hasCoApplicant, hasAdultChildren }) {
  return (
    <div>
      <p className="step-desc">近十年出入境记录</p>

      <PersonTravel
        title="主申请人"
        dataKey="mainTravel"
        data={formData.mainTravel || []}
        onChange={onChange}
      />

      {hasCoApplicant && (
        <PersonTravel
          title="副申请人"
          dataKey="coTravel"
          data={formData.coTravel || []}
          onChange={onChange}
        />
      )}

      {hasAdultChildren && (
        <PersonTravel
          title="18-22岁子女"
          dataKey="adultChildrenTravel"
          data={formData.adultChildrenTravel || []}
          onChange={onChange}
        />
      )}
    </div>
  )
}
