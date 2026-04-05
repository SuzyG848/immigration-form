import FormField, { Input, Select } from '../components/FormField.jsx'
import RepeatableSection from '../components/RepeatableSection.jsx'

const genderOptions = [
  { value: '男', label: '男' },
  { value: '女', label: '女' },
]

const maritalOptions = [
  { value: '未婚', label: '未婚' },
  { value: '已婚', label: '已婚' },
  { value: '离婚', label: '离婚' },
  { value: '丧偶', label: '丧偶' },
]

const relationOptions = [
  { value: '父亲', label: '父亲' },
  { value: '母亲', label: '母亲' },
  { value: '兄弟', label: '兄弟' },
  { value: '姐妹', label: '姐妹' },
]

const emptyEntry = {
  nameCn: '', namePinyin: '', gender: '', relation: '',
  birthDate: '', birthCity: '', maritalStatus: '', occupation: '', address: ''
}

function PersonFamily({ title, dataKey, data, onChange }) {
  return (
    <div className="background-person">
      <h3 className="person-title">{title}的父母及兄弟姐妹信息</h3>
      <RepeatableSection
        items={data}
        onChange={entries => onChange(dataKey, entries)}
        minItems={2}
        maxItems={10}
        emptyItem={emptyEntry}
        addLabel="+ 添加一位亲属"
        renderItem={(item, index, update) => (
          <div>
            <div className="field-row">
              <FormField label="姓名（汉字）" required>
                <Input value={item.nameCn} onChange={v => update('nameCn', v)} placeholder="张三" />
              </FormField>
              <FormField label="姓名拼音" required>
                <Input value={item.namePinyin} onChange={v => update('namePinyin', v)} placeholder="Zhang, San" />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="性别" required>
                <Select value={item.gender} onChange={v => update('gender', v)} options={genderOptions} />
              </FormField>
              <FormField label="与申请人关系" required>
                <Select value={item.relation} onChange={v => update('relation', v)} options={relationOptions} />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="出生年月日" required hint="YYYY-MM-DD">
                <Input value={item.birthDate} onChange={v => update('birthDate', v)} placeholder="1960-05-20" />
              </FormField>
              <FormField label="出生地（县/市）" required>
                <Input value={item.birthCity} onChange={v => update('birthCity', v)} placeholder="上海市" />
              </FormField>
            </div>
            <div className="field-row">
              <FormField label="婚姻状况" required>
                <Select value={item.maritalStatus} onChange={v => update('maritalStatus', v)} options={maritalOptions} />
              </FormField>
              <FormField label="当前职业" required>
                <Input value={item.occupation} onChange={v => update('occupation', v)} placeholder="退休 / 教师（如过世请注明城市和日期）" />
              </FormField>
            </div>
            <FormField label="详细居住地址" required hint="房楼号-小区-街道号-街道名称-区-城市-省-国家">
              <Input value={item.address} onChange={v => update('address', v)} placeholder="101-万科城市花园-1号-中山路-朝阳区-北京-北京-中国" />
            </FormField>
          </div>
        )}
      />
    </div>
  )
}

export default function FamilyStep({ formData, onChange, hasCoApplicant }) {
  const mainFamily = formData.mainFamily || []
  const coFamily = formData.coFamily || []

  return (
    <div>
      <p className="step-desc">请填写申请人父母及兄弟姐妹的信息。</p>

      <PersonFamily
        title="主申请人"
        dataKey="mainFamily"
        data={mainFamily}
        onChange={onChange}
      />

      {hasCoApplicant && (
        <PersonFamily
          title="副申请人"
          dataKey="coFamily"
          data={coFamily}
          onChange={onChange}
        />
      )}
    </div>
  )
}
