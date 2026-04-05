import FormField, { Input, Textarea } from '../components/FormField.jsx'
import RepeatableSection from '../components/RepeatableSection.jsx'

const emptyEntry = {
  startDate: '', endDate: '', orgName: '', orgType: '', duties: '', location: ''
}

function PersonOrg({ title, dataKey, data, onChange }) {
  return (
    <div className="background-person">
      <h3 className="person-title">{title}</h3>
      <p className="step-note">请包括任何政治、社会、青年或学生组织、工会以及专业协会。如无请不填或点击"跳过"。</p>
      <RepeatableSection
        items={data}
        onChange={entries => onChange(dataKey, entries)}
        minItems={0}
        maxItems={10}
        emptyItem={emptyEntry}
        addLabel="+ 添加一个组织"
        renderItem={(item, index, update) => (
          <div>
            <div className="field-row">
              <FormField label="起始日期" hint="YYYY-MM">
                <Input value={item.startDate} onChange={v => update('startDate', v)} placeholder="2010-09" />
              </FormField>
              <FormField label="终止日期" hint="YYYY-MM，如至今请填写至今">
                <Input value={item.endDate} onChange={v => update('endDate', v)} placeholder="2014-07" />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="组织名称">
                <Input value={item.orgName} onChange={v => update('orgName', v)} placeholder="中国共产主义青年团" />
              </FormField>
              <FormField label="组织类型">
                <Input value={item.orgType} onChange={v => update('orgType', v)} placeholder="青年组织" />
              </FormField>
            </div>
            <FormField label="主要职责">
              <Input value={item.duties} onChange={v => update('duties', v)} placeholder="普通成员" />
            </FormField>
            <FormField label="所在地区和国家">
              <Input value={item.location} onChange={v => update('location', v)} placeholder="北京，中国" />
            </FormField>
          </div>
        )}
      />
    </div>
  )
}

export default function OrgStep({ formData, onChange, hasCoApplicant }) {
  return (
    <div>
      <p className="step-desc">组织成员情况（如无可不填）</p>

      <PersonOrg
        title="主申请人"
        dataKey="mainOrg"
        data={formData.mainOrg || []}
        onChange={onChange}
      />

      {hasCoApplicant && (
        <PersonOrg
          title="副申请人"
          dataKey="coOrg"
          data={formData.coOrg || []}
          onChange={onChange}
        />
      )}
    </div>
  )
}
