import FormField, { Input, Select, Textarea, RadioGroup } from '../components/FormField.jsx'

const genderOptions = [
  { value: '男', label: '男' },
  { value: '女', label: '女' },
]

const maritalOptions = [
  { value: '未婚', label: '未婚' },
  { value: '已婚', label: '已婚' },
  { value: '离婚', label: '离婚' },
  { value: '丧偶', label: '丧偶' },
  { value: '分居', label: '分居' },
  { value: '同居', label: '同居（Common-law）' },
]

const yesNoOptions = [
  { value: '是', label: '是' },
  { value: '否', label: '否' },
]

export default function PersonalInfoStep({ person, childIndex, formData, onChange, errors }) {
  // Determine data key and title
  let dataKey, title
  if (person === 'main') {
    dataKey = 'mainBasic'
    title = '主申请人'
  } else if (person === 'co') {
    dataKey = 'coBasic'
    title = '副申请人'
  } else {
    dataKey = `child${childIndex}`
    title = `子女 ${childIndex + 1}`
  }

  const data = formData[dataKey] || {}
  const err = errors?.[dataKey] || {}

  function set(field, value) {
    onChange(dataKey, { ...data, [field]: value })
  }

  const isChild = person === 'child'

  return (
    <div>
      <p className="step-desc">{title}的基本信息</p>

      <div className="field-row">
        <FormField label="姓氏（汉字）" required error={err.lastNameCn}>
          <Input value={data.lastNameCn} onChange={v => set('lastNameCn', v)} placeholder="张" />
        </FormField>
        <FormField label="姓氏拼音" required error={err.lastNamePinyin}>
          <Input value={data.lastNamePinyin} onChange={v => set('lastNamePinyin', v)} placeholder="Zhang" />
        </FormField>
      </div>

      <div className="field-row">
        <FormField label="名字（汉字）" required error={err.firstNameCn}>
          <Input value={data.firstNameCn} onChange={v => set('firstNameCn', v)} placeholder="三" />
        </FormField>
        <FormField label="名字拼音" required error={err.firstNamePinyin}>
          <Input value={data.firstNamePinyin} onChange={v => set('firstNamePinyin', v)} placeholder="San" />
        </FormField>
      </div>

      <FormField label="曾用名及拼音（如有）" hint="请查阅户口本、出生证等">
        <Input value={data.formerName} onChange={v => set('formerName', v)} placeholder="如无请留空" />
      </FormField>

      <div className="field-row">
        <FormField label="性别" required error={err.gender}>
          <RadioGroup value={data.gender} onChange={v => set('gender', v)} options={genderOptions} />
        </FormField>
        <FormField label="出生日期" required hint="格式：YYYY-MM-DD" error={err.birthDate}>
          <Input value={data.birthDate} onChange={v => set('birthDate', v)} placeholder="1990-01-15" />
        </FormField>
      </div>

      <div className="field-row">
        <FormField label="出生城市（中文）" required error={err.birthCityCn}>
          <Input value={data.birthCityCn} onChange={v => set('birthCityCn', v)} placeholder="北京市" />
        </FormField>
        <FormField label="出生城市拼音" required error={err.birthCityPinyin}>
          <Input value={data.birthCityPinyin} onChange={v => set('birthCityPinyin', v)} placeholder="Beijing" />
        </FormField>
      </div>

      <FormField label="身高（CM）" required error={err.height}>
        <Input value={data.height} onChange={v => set('height', v)} placeholder="170" />
      </FormField>

      <div className="section-divider">身份证信息</div>

      <FormField label="身份证号码" required error={err.idNumber}>
        <Input value={data.idNumber} onChange={v => set('idNumber', v)} placeholder="110101199001150000" />
      </FormField>
      <div className="field-row">
        <FormField label="身份证签发日" required error={err.idIssueDate}>
          <Input value={data.idIssueDate} onChange={v => set('idIssueDate', v)} placeholder="2015-01-01" />
        </FormField>
        <FormField label="身份证到期日" required error={err.idExpiry}>
          <Input value={data.idExpiry} onChange={v => set('idExpiry', v)} placeholder="2025-01-01" />
        </FormField>
      </div>

      <div className="section-divider">护照信息</div>

      <FormField label="护照号码" required error={err.passportNumber}>
        <Input value={data.passportNumber} onChange={v => set('passportNumber', v)} placeholder="E12345678" />
      </FormField>
      <div className="field-row">
        <FormField label="护照签发日" required error={err.passportIssueDate}>
          <Input value={data.passportIssueDate} onChange={v => set('passportIssueDate', v)} placeholder="2020-06-01" />
        </FormField>
        <FormField label="护照到期日" required error={err.passportExpiry}>
          <Input value={data.passportExpiry} onChange={v => set('passportExpiry', v)} placeholder="2030-06-01" />
        </FormField>
      </div>

      {!isChild && (
        <>
          <FormField label="语言成绩（雅思等）（如有）">
            <Input value={data.languageScore} onChange={v => set('languageScore', v)} placeholder="雅思总分7.0，听说读写：8/7/7/6.5" />
          </FormField>

          <div className="section-divider">联系方式</div>

          <div className="field-row">
            <FormField label="手机号码" required error={err.phone}>
              <Input value={data.phone} onChange={v => set('phone', v)} placeholder="+86 138 0000 0000" />
            </FormField>
            <FormField label="电子邮箱" required error={err.personalEmail}>
              <Input type="email" value={data.personalEmail} onChange={v => set('personalEmail', v)} placeholder="example@email.com" />
            </FormField>
          </div>

          <div className="section-divider">婚姻状况</div>

          <FormField label="婚姻状况" required error={err.maritalStatus}>
            <Select value={data.maritalStatus} onChange={v => set('maritalStatus', v)} options={maritalOptions} />
          </FormField>

          {(data.maritalStatus === '已婚' || data.maritalStatus === '同居') && (
            <FormField label="结婚/同居日期" required error={err.marriageDate}>
              <Input value={data.marriageDate} onChange={v => set('marriageDate', v)} placeholder="2015-08-20" />
            </FormField>
          )}

          <FormField label="离婚史（如有）" hint="请填写：婚姻起止日期、前配偶姓名和出生日期">
            <Textarea value={data.divorceHistory} onChange={v => set('divorceHistory', v)} placeholder="如无请留空" />
          </FormField>

          <div className="section-divider">加拿大入境记录</div>

          <FormField label="第一次入境加拿大的时间、地点和目的（如有）">
            <Textarea value={data.firstEntryCA} onChange={v => set('firstEntryCA', v)} placeholder="如：2018年9月，温哥华机场，留学" rows={2} />
          </FormField>
          <FormField label="最近一次入境加拿大的时间、地点和目的（如有）">
            <Textarea value={data.lastEntryCA} onChange={v => set('lastEntryCA', v)} placeholder="如：2023年1月，多伦多机场，工作" rows={2} />
          </FormField>

          <div className="section-divider">签证记录</div>

          <FormField label="目前持有的加拿大签证记录（如有）" hint="种类、签发日期、到期日期">
            <Textarea value={data.currentVisas} onChange={v => set('currentVisas', v)} placeholder="如：工作许可，2022-01-01至2025-01-01" rows={2} />
          </FormField>
          <FormField label="之前持有的加拿大签证记录（如有）">
            <Textarea value={data.previousVisas} onChange={v => set('previousVisas', v)} placeholder="如无请留空" rows={2} />
          </FormField>
          <FormField label="近十年来居住超过6个月的国家（除原籍国和常驻国）（如有）">
            <Input value={data.otherCountries} onChange={v => set('otherCountries', v)} placeholder="如无请留空" />
          </FormField>

          <div className="section-divider">其他信息</div>

          <FormField label="目前详细居住地址" required error={err.address} hint="格式：房楼号-小区-街道号-街道名称-区-城市-省-国家">
            <Textarea value={data.address} onChange={v => set('address', v)} placeholder="101-万科城市花园-1号-中山路-朝阳区-北京-北京-中国" rows={2} />
          </FormField>

          <FormField label="12个月内是否进行过加拿大签证/移民方面的体检？" required error={err.medicalExam}>
            <RadioGroup value={data.medicalExam} onChange={v => set('medicalExam', v)} options={yesNoOptions} />
          </FormField>
          <FormField label="10年内是否向移民局提供过指纹信息？" required error={err.biometrics}>
            <RadioGroup value={data.biometrics} onChange={v => set('biometrics', v)} options={yesNoOptions} />
          </FormField>
        </>
      )}

      {isChild && (
        <>
          <div className="section-divider">联系方式（如适用）</div>
          <FormField label="手机号码">
            <Input value={data.phone} onChange={v => set('phone', v)} placeholder="+86 138 0000 0000" />
          </FormField>
          <FormField label="婚姻状况" required error={err.maritalStatus}>
            <Select value={data.maritalStatus} onChange={v => set('maritalStatus', v)} options={maritalOptions} />
          </FormField>
          <FormField label="是否一同移民？" required error={err.joiningFamily}>
            <RadioGroup value={data.joiningFamily} onChange={v => set('joiningFamily', v)} options={yesNoOptions} />
          </FormField>
        </>
      )}
    </div>
  )
}

export function validatePersonal(formData, dataKey) {
  const data = formData[dataKey] || {}
  const errors = {}
  const required = ['lastNameCn', 'lastNamePinyin', 'firstNameCn', 'firstNamePinyin',
    'gender', 'birthDate', 'birthCityCn', 'birthCityPinyin', 'height',
    'idNumber', 'idIssueDate', 'idExpiry', 'passportNumber', 'passportIssueDate', 'passportExpiry']

  const isChild = dataKey.startsWith('child')
  if (!isChild) {
    required.push('phone', 'personalEmail', 'maritalStatus', 'address', 'medicalExam', 'biometrics')
  } else {
    required.push('maritalStatus', 'joiningFamily')
  }

  required.forEach(f => {
    if (!data[f]) errors[f] = '此项为必填'
  })

  return errors
}
