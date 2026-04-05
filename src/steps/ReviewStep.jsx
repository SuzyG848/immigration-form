export default function ReviewStep({ formData, onSubmit, submitting }) {
  const main = formData.mainBasic || {}

  return (
    <div>
      <p className="step-desc">请确认以下信息后提交。提交后将无法修改，顾问会收到通知邮件。</p>

      <div className="review-card">
        <h3>基本信息确认</h3>
        <div className="review-row">
          <span>主申请人姓名：</span>
          <strong>{main.lastNameCn}{main.firstNameCn}（{main.lastNamePinyin}, {main.firstNamePinyin}）</strong>
        </div>
        <div className="review-row">
          <span>出生日期：</span>
          <strong>{main.birthDate}</strong>
        </div>
        <div className="review-row">
          <span>护照号码：</span>
          <strong>{main.passportNumber}</strong>
        </div>
        <div className="review-row">
          <span>联系邮箱：</span>
          <strong>{formData.email}</strong>
        </div>
        <div className="review-row">
          <span>是否有副申请人：</span>
          <strong>{formData.hasCoApplicant ? '是' : '否'}</strong>
        </div>
        <div className="review-row">
          <span>未成年子女数量：</span>
          <strong>{formData.numberOfMinorChildren} 人</strong>
        </div>
      </div>

      <div className="review-notice">
        <p>提交前请确认：</p>
        <ul>
          <li>所有信息均已如实填写</li>
          <li>日期格式正确（YYYY-MM-DD 或 YYYY-MM）</li>
          <li>背景申报问题已认真阅读并如实回答</li>
        </ul>
      </div>

      <button
        className="btn-submit"
        onClick={onSubmit}
        disabled={submitting}
      >
        {submitting ? '提交中...' : '确认提交'}
      </button>
    </div>
  )
}
