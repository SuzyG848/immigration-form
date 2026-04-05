import FormField, { Input, Textarea } from '../components/FormField.jsx'
import RepeatableSection from '../components/RepeatableSection.jsx'

const emptyEntry = {
  companyCn: '', companyEn: '', contact: '', address: '',
  position: '', startDate: '', endDate: '', duties: ''
}

export default function WorkStep({ person, formData, onChange, errors }) {
  const dataKey = person === 'main' ? 'mainWork' : 'coWork'
  const title = person === 'main' ? '主申请人' : '副申请人'
  const entries = formData[dataKey] || []

  return (
    <div>
      <p className="step-desc">{title}近十年工作信息（从最近的工作开始填写）</p>
      <p className="step-note">请提前告知：若曾是政治、学术、贸易或其他组织的支持者/成员，或曾服役，请在后续步骤中填写。</p>

      <RepeatableSection
        items={entries}
        onChange={entries => onChange(dataKey, entries)}
        minItems={1}
        maxItems={8}
        emptyItem={emptyEntry}
        addLabel="+ 添加一段工作经历"
        renderItem={(item, index, update) => (
          <div>
            <div className="field-row">
              <FormField label="公司中文名称" required>
                <Input value={item.companyCn} onChange={v => update('companyCn', v)} placeholder="某某科技有限公司" />
              </FormField>
              <FormField label="官方英文名称（如有）">
                <Input value={item.companyEn} onChange={v => update('companyEn', v)} placeholder="ABC Technology Co., Ltd." />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="公司联系方式" required>
                <Input value={item.contact} onChange={v => update('contact', v)} placeholder="010-12345678" />
              </FormField>
              <FormField label="公司详细地址" required>
                <Input value={item.address} onChange={v => update('address', v)} placeholder="北京市朝阳区XX路XX号" />
              </FormField>
            </div>
            <FormField label="职位" required>
              <Input value={item.position} onChange={v => update('position', v)} placeholder="软件工程师" />
            </FormField>
            <div className="field-row">
              <FormField label="入职日期" required hint="YYYY-MM-DD">
                <Input value={item.startDate} onChange={v => update('startDate', v)} placeholder="2018-03-01" />
              </FormField>
              <FormField label="离职日期" required hint="YYYY-MM-DD，如仍在职填写至今">
                <Input value={item.endDate} onChange={v => update('endDate', v)} placeholder="至今 / 2022-06-30" />
              </FormField>
            </div>
            <FormField label="主要职责" required>
              <Textarea value={item.duties} onChange={v => update('duties', v)} placeholder="负责系统架构设计、团队管理等" rows={3} />
            </FormField>
          </div>
        )}
      />
    </div>
  )
}

export function validateWork(formData, person) {
  const dataKey = person === 'main' ? 'mainWork' : 'coWork'
  const entries = formData[dataKey] || []
  if (entries.length === 0) return { [dataKey]: '请至少填写一段工作经历（如从未工作过请填写"待业"并注明时间段）' }
  return {}
}
