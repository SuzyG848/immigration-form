import FormField, { Input } from '../components/FormField.jsx'
import RepeatableSection from '../components/RepeatableSection.jsx'

const emptyEntry = {
  startDate: '', endDate: '', level: '', department: '', position: ''
}

function PersonGovt({ title, dataKey, data, onChange }) {
  return (
    <div className="background-person">
      <h3 className="person-title">{title}</h3>
      <p className="step-note">请列出曾担任过的任何政府职务（如公务员、法官、警察、安全组织的员工）。如无可不填。</p>
      <RepeatableSection
        items={data}
        onChange={entries => onChange(dataKey, entries)}
        minItems={0}
        maxItems={8}
        emptyItem={emptyEntry}
        addLabel="+ 添加一段公职记录"
        renderItem={(item, index, update) => (
          <div>
            <div className="field-row">
              <FormField label="起始日期" hint="YYYY-MM">
                <Input value={item.startDate} onChange={v => update('startDate', v)} placeholder="2005-07" />
              </FormField>
              <FormField label="终止日期" hint="YYYY-MM，如至今请填写至今">
                <Input value={item.endDate} onChange={v => update('endDate', v)} placeholder="2015-12" />
              </FormField>
            </div>
            <FormField label="国家及地区级别（国/省/市/区）">
              <Input value={item.level} onChange={v => update('level', v)} placeholder="市级" />
            </FormField>
            <FormField label="单位名称及部门">
              <Input value={item.department} onChange={v => update('department', v)} placeholder="北京市公安局朝阳分局" />
            </FormField>
            <FormField label="职务">
              <Input value={item.position} onChange={v => update('position', v)} placeholder="警员" />
            </FormField>
          </div>
        )}
      />
    </div>
  )
}

export default function GovtStep({ formData, onChange, hasCoApplicant }) {
  return (
    <div>
      <p className="step-desc">公职情况（如无可不填）</p>

      <PersonGovt
        title="主申请人"
        dataKey="mainGovt"
        data={formData.mainGovt || []}
        onChange={onChange}
      />

      {hasCoApplicant && (
        <PersonGovt
          title="副申请人"
          dataKey="coGovt"
          data={formData.coGovt || []}
          onChange={onChange}
        />
      )}
    </div>
  )
}
