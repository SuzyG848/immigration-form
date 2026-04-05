import FormField, { Input } from '../components/FormField.jsx'
import RepeatableSection from '../components/RepeatableSection.jsx'

const emptyEntry = {
  startDate: '', endDate: '', country: '', province: '', city: '', address: ''
}

function PersonResidence({ title, dataKey, data, onChange }) {
  return (
    <div className="background-person">
      <h3 className="person-title">{title}</h3>
      <p className="step-note">从最近开始填，时间必须连续，不能与教育、工作城市矛盾。短期旅游不需填写。</p>
      <RepeatableSection
        items={data}
        onChange={entries => onChange(dataKey, entries)}
        minItems={1}
        maxItems={10}
        emptyItem={emptyEntry}
        addLabel="+ 添加一段居住记录"
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
                <Input value={item.province} onChange={v => update('province', v)} placeholder="北京市 / Ontario" />
              </FormField>
            </div>
            <FormField label="城市" required>
              <Input value={item.city} onChange={v => update('city', v)} placeholder="北京 / Toronto" />
            </FormField>
            <FormField label="详细居住地址" required hint="房楼号-小区-街道号-街道名称-区-邮编">
              <Input value={item.address} onChange={v => update('address', v)} placeholder="101-万科城市花园-1号-中山路-朝阳区-100000" />
            </FormField>
          </div>
        )}
      />
    </div>
  )
}

export default function ResidenceStep({ formData, onChange, hasCoApplicant }) {
  return (
    <div>
      <p className="step-desc">近10年或18岁以后的居住历史（从最近开始）</p>

      <PersonResidence
        title="主申请人居住历史"
        dataKey="mainResidence"
        data={formData.mainResidence || []}
        onChange={onChange}
      />

      {hasCoApplicant && (
        <PersonResidence
          title="副申请人居住历史"
          dataKey="coResidence"
          data={formData.coResidence || []}
          onChange={onChange}
        />
      )}
    </div>
  )
}
