import FormField, { Input, Select } from '../components/FormField.jsx'
import RepeatableSection from '../components/RepeatableSection.jsx'

const degreeOptions = [
  { value: '本科', label: '本科' },
  { value: '大专', label: '大专' },
  { value: '高中', label: '高中' },
  { value: '其他', label: '其他' },
]

const emptyWork = { startDate: '', endDate: '', company: '', city: '', country: '', position: '' }
const emptyResidence = { startDate: '', endDate: '', country: '', province: '', city: '', address: '' }
const emptyEducation = { startDate: '', endDate: '', school: '', degree: '', city: '', major: '' }

export default function AdultChildrenStep({ formData, onChange }) {
  const data = formData.adultChildren || { work: [], residence: [], education: [] }

  function set(key, value) {
    onChange('adultChildren', { ...data, [key]: value })
  }

  return (
    <div>
      <p className="step-desc">18-22岁成年子女信息（从18岁至今）</p>

      <h3 className="person-title">工作历史（18岁至今，从最近开始）</h3>
      <RepeatableSection
        items={data.work}
        onChange={entries => set('work', entries)}
        minItems={0}
        maxItems={8}
        emptyItem={emptyWork}
        addLabel="+ 添加一段工作经历"
        renderItem={(item, index, update) => (
          <div>
            <div className="field-row">
              <FormField label="起始日期" hint="YYYY-MM">
                <Input value={item.startDate} onChange={v => update('startDate', v)} placeholder="2021-09" />
              </FormField>
              <FormField label="终止日期" hint="YYYY-MM，如至今请填写至今">
                <Input value={item.endDate} onChange={v => update('endDate', v)} placeholder="至今" />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="公司名称">
                <Input value={item.company} onChange={v => update('company', v)} placeholder="某某公司" />
              </FormField>
              <FormField label="职位">
                <Input value={item.position} onChange={v => update('position', v)} placeholder="实习生" />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="公司所在城市">
                <Input value={item.city} onChange={v => update('city', v)} placeholder="北京" />
              </FormField>
              <FormField label="公司所在国家">
                <Input value={item.country} onChange={v => update('country', v)} placeholder="中国" />
              </FormField>
            </div>
          </div>
        )}
      />

      <h3 className="person-title" style={{ marginTop: '2rem' }}>居住地址（18岁至今，从最近开始）</h3>
      <RepeatableSection
        items={data.residence}
        onChange={entries => set('residence', entries)}
        minItems={1}
        maxItems={8}
        emptyItem={emptyResidence}
        addLabel="+ 添加一段居住记录"
        renderItem={(item, index, update) => (
          <div>
            <div className="field-row">
              <FormField label="起始日期" hint="YYYY-MM">
                <Input value={item.startDate} onChange={v => update('startDate', v)} placeholder="2020-09" />
              </FormField>
              <FormField label="终止日期" hint="YYYY-MM，如至今请填写至今">
                <Input value={item.endDate} onChange={v => update('endDate', v)} placeholder="至今" />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="国家">
                <Input value={item.country} onChange={v => update('country', v)} placeholder="中国" />
              </FormField>
              <FormField label="省（州）">
                <Input value={item.province} onChange={v => update('province', v)} placeholder="北京市" />
              </FormField>
            </div>
            <FormField label="城市">
              <Input value={item.city} onChange={v => update('city', v)} placeholder="北京" />
            </FormField>
            <FormField label="详细地址">
              <Input value={item.address} onChange={v => update('address', v)} placeholder="朝阳区某某路1号" />
            </FormField>
          </div>
        )}
      />

      <h3 className="person-title" style={{ marginTop: '2rem' }}>教育历史（从最高学历写起）</h3>
      <RepeatableSection
        items={data.education}
        onChange={entries => set('education', entries)}
        minItems={1}
        maxItems={5}
        emptyItem={emptyEducation}
        addLabel="+ 添加一段教育经历"
        renderItem={(item, index, update) => (
          <div>
            <div className="field-row">
              <FormField label="起始日期" hint="YYYY-MM-DD">
                <Input value={item.startDate} onChange={v => update('startDate', v)} placeholder="2020-09-01" />
              </FormField>
              <FormField label="毕业日期" hint="YYYY-MM-DD">
                <Input value={item.endDate} onChange={v => update('endDate', v)} placeholder="2024-06-30" />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="学校名称">
                <Input value={item.school} onChange={v => update('school', v)} placeholder="北京大学" />
              </FormField>
              <FormField label="学历">
                <Select value={item.degree} onChange={v => update('degree', v)} options={degreeOptions} />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="就读城市">
                <Input value={item.city} onChange={v => update('city', v)} placeholder="北京" />
              </FormField>
              <FormField label="专业">
                <Input value={item.major} onChange={v => update('major', v)} placeholder="计算机科学" />
              </FormField>
            </div>
          </div>
        )}
      />
    </div>
  )
}
