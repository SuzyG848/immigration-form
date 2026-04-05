import FormField, { Input } from '../components/FormField.jsx'
import RepeatableSection from '../components/RepeatableSection.jsx'

const emptyEntry = {
  startDate: '', endDate: '', unit: '', location: '', rank: '', reason: ''
}

function PersonMilitary({ title, dataKey, data, onChange }) {
  return (
    <div className="background-person">
      <h3 className="person-title">{title}</h3>
      <p className="step-note">如无服役经历可不填。</p>
      <RepeatableSection
        items={data}
        onChange={entries => onChange(dataKey, entries)}
        minItems={0}
        maxItems={5}
        emptyItem={emptyEntry}
        addLabel="+ 添加一段服役记录"
        renderItem={(item, index, update) => (
          <div>
            <div className="field-row">
              <FormField label="起始日期" hint="YYYY-MM">
                <Input value={item.startDate} onChange={v => update('startDate', v)} placeholder="2000-09" />
              </FormField>
              <FormField label="终止日期" hint="YYYY-MM">
                <Input value={item.endDate} onChange={v => update('endDate', v)} placeholder="2002-09" />
              </FormField>
            </div>
            <FormField label="部队名称、番号和指挥官">
              <Input value={item.unit} onChange={v => update('unit', v)} placeholder="中国人民解放军某部" />
            </FormField>
            <FormField label="服役时间和地点">
              <Input value={item.location} onChange={v => update('location', v)} placeholder="北京，2年" />
            </FormField>
            <div className="field-row">
              <FormField label="军衔">
                <Input value={item.rank} onChange={v => update('rank', v)} placeholder="士兵" />
              </FormField>
              <FormField label="退役理由">
                <Input value={item.reason} onChange={v => update('reason', v)} placeholder="服役期满" />
              </FormField>
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default function MilitaryStep({ formData, onChange, hasCoApplicant }) {
  return (
    <div>
      <p className="step-desc">服役情况（如无可不填）</p>

      <PersonMilitary
        title="主申请人"
        dataKey="mainMilitary"
        data={formData.mainMilitary || []}
        onChange={onChange}
      />

      {hasCoApplicant && (
        <PersonMilitary
          title="副申请人"
          dataKey="coMilitary"
          data={formData.coMilitary || []}
          onChange={onChange}
        />
      )}
    </div>
  )
}
