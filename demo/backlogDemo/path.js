const _ = require('lodash');

let str = `
/epl/bid/clarify/queryBidClarifyBd.htm
/epl/bid/main/queryBidMainConsole.htm
/epl/pur/exeplan/viewExeplan.htm
/epl/bid/clarify/viewClarifyTe.htm
/epl/bid/regstration/selectSignSupplierApv.htm
/epl/bid/invitatio/viewInvitatioApv.htm
/epl/bid/main/viewfuzhuApv.htm
/epl/pur/apply/viewApply.htm
/epl/bid/eva/auditEbResultTec.htm
/epl/pur/needsPlan/viewNeedsPlan.htm
/epl/bid/eva/auditEbResultBus.htm
/epl/daily/apply/view.htm
/epl/bid/abnormal/viewAbnormalApv.htm
/epl/bid/main/modifyBidMain.htm
/epl/st/stock/viewIntoStorage.htm
/epl/irs/assessment/viewAssessmentScore.htm
/epl/pur/exeplan/viewExeplan.htm
/epl/irs/assessment/assessmentApv.htm
/epl/bid/award/viewBidAwardApv.htm
/epl/rfq/document/management/main.htm
/epl/rfq/document/management/queryProject.htm
/epl/pur/exeplan/modifyPartExeplan.htm
/epl/bid/invitatio/viewInvitatioInfoBd.htm
/epl/rfq/document/management/myHisProject.htm
/epl/bid/main/queryBidMainBidder.htm
/epl/cat/materialMgmt/viewPurMaterial.htm
/epl/pur/contract/viewContract.htm
/epl/pur/selfEvaluate/viewSelfEvaluate.htm
/epl/pur/selfEvaluate/viewSelfEvaluate2.htm
/epl/pur/requisition/viewRequisition.htm
/epl/rfq/registration/invite/queryInvitationProject.htm
/epl/pur/order/viewOrder.htm
/epl/bid/deliver/selectDeliverApv.htm
/epl/rfq/award/management/queryAwardReusltApv.htm
/epl/rfq/document/management/queryProjectApv.htm
/mem/org/applyjoin/queryApplyUser.htm
/mem/comp/management/viewCompOrg.htm
/mem/fosunOALogin.htm
/mem/org/honor/queryMemOrgHonor.htm
/oti/job/leave/viewLeaveInfo.htm
/sys/apv/bug/view.htm
/opt/org/verification/auditOrgVerification.htm`

function getIndex(a) {
    a = _.trimLeft(a, "/")
    let nums = a.split("/").slice(0, 3).map(a => a.charCodeAt(0))
    return nums[0] * 1000000 + nums[1] * 100 + nums[2]
}

async function main2() {
    let results = str.split("\n").filter(a => a).sort((a, b) => getIndex(a) - getIndex(b))
    console.log(results.join("\n"))
}

let what = getIndex("/opt/org/verification/auditOrgVerification.htm");
console.log(what)
main2()