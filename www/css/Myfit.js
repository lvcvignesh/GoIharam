P.when("A", "a-button", "a-popover", "a-carousel-framework", "cf", "jQuery").execute(function(A, buttons, popover, carouselFramework, cf, $) {
var myFit = {};
myFit.retrySubmitting = function(ajaxURL, params, attempts, maxRetries) {
var timeout = 4000*attempts;
if (attempts > maxRetries) {
return;
}
$.ajax({
url : ajaxURL,
type : 'POST',
data : params,
timeout : timeout,
error : function() {
myFit.retrySubmitting(ajaxURL, params, attempts + 1, maxRetries);
}
});
};
myFit.submitRecommendationGivenFeedback = function() {
var url = myFit.baseURL + "/ref=myfit_reco";
var params = {
"action" : "reco",
"asin" : myFit.pAsin
};
myFit.retrySubmitting(url, params, 1, 3);
};
myFit.submitLinkClickedFeedBack = function() {
var url = myFit.baseURL + "/ref=myfit_lh";
var params = {
"action" : "linkHit",
"asin" : myFit.pAsin
};
myFit.retrySubmitting(url, params, 1, 3);
};
myFit.popoverDisplayLinkHandler = function(event){
myFit.submitLinkClickedFeedBack();
myFit.$popoverDisplayLink.unbind("mouseover touchstart", myFit.popoverDisplayLinkHandler);
}
myFit.getSelectedSizeFromState = function(variationState) {
return variationState[0];
};
myFit.showFitFinder = function(vote) {
myFit.$recFinderLink.hide();
myFit.$recFinder.show();
// Move the carousel to the page which has the card selected by the user
if (myFit.areCarouselsInitialized) {
myFit.gotoPageInCarousel(myFit.$menCarousel, myFit.$menCarouselSelectedPage);
myFit.gotoPageInCarousel(myFit.$womenCarousel, myFit.$womenCarouselSelectedPage);
}
else {
myFit.setupCarousels();
myFit.areCarouselsInitialized = true;
}
};
myFit.setupCarousels = function(){
//Initializing the carousels.
myFit.initCarousel();
//Binding the selection and submit functionality into the size buttons once they are visible.
myFit.passSizeValueFromCarouselMen();
myFit.passSizeValueFromCarouselWomen();
myFit.passWidthValueFromCarouselMen();
myFit.passWidthValueFromCarouselWomen();
}
myFit.initCarousel = function() {
carouselFramework.createAll();
carouselFramework.initializeAll();
myFit.$menCarousel = carouselFramework.getCarouselByName("myFitSizeCarouselMen");
myFit.$womenCarousel = carouselFramework.getCarouselByName("myFitSizeCarouselWomen");
myFit.showPopularSizesInCarousel("myFitSizeCarouselMen", 3);
myFit.showPopularSizesInCarousel("myFitSizeCarouselWomen", 3);
}
myFit.showPopularSizesInCarousel = function(carouselName, pageNumber) {
carouselFramework.onInit(carouselName, function (carousel) {
myFit.gotoPageInCarousel(carousel, pageNumber);
});
}
myFit.gotoPageInCarousel = function(carousel, pageNumber) {
if (carousel != undefined && pageNumber != undefined) {
carousel.gotoPage(pageNumber, {
animationDuration: 0,
silent : true
});
}
}
myFit.carouselButtonSelectionStyling = function(id, selectedElement){
$("#" + id + " #myFitCarouselAUIButton.a-button-selected").removeClass("a-button-selected");
$("#" + id + " #myFitCarouselAUIButton.a-button-focus").removeClass("a-button-focus");
$(selectedElement).addClass("a-button-selected");
}
myFit.passSizeValueFromCarouselMen = function(){
myFit.$carouselSizeButtonMen.bind("click", function(){
var self = this;
myFit.carouselButtonSelectionStyling("myFitSizeCarouselMen", self);
var regularSize = $("#myFitSizeCarouselMen #myFitCarouselAUIButton.a-button-selected button#myFitCarouselButton").val();
if (regularSize !== myFit.menRegularSize) {
if (myFit.$menCarousel != null) {
myFit.$menCarouselSelectedPage = myFit.$menCarousel.getAttr("pageNumber");
}
myFit.menRegularSize = regularSize;
myFit.submitUserRegularSize(regularSize);
}
})
}
myFit.passSizeValueFromCarouselWomen = function(){
myFit.$carouselSizeButtonWomen.bind("click", function(){
var self = this;
myFit.carouselButtonSelectionStyling("myFitSizeCarouselWomen", self);
var regularSize = $("#myFitSizeCarouselWomen #myFitCarouselAUIButton.a-button-selected button#myFitCarouselButton").val();
if (regularSize !== myFit.womenRegularSize) {
if (myFit.$womenCarousel != null) {
myFit.$womenCarouselSelectedPage = myFit.$womenCarousel.getAttr("pageNumber");
}
myFit.womenRegularSize = regularSize;
myFit.submitUserRegularSize(regularSize);
}
})
}
myFit.passWidthValueFromCarouselMen = function(){
myFit.$carouselWidthButtonMen.bind("click", function(){
var self = this;
myFit.carouselButtonSelectionStyling("myFitWidthCarouselMen", self);
var width = $("#myFitWidthCarouselMen #myFitCarouselAUIButton.a-button-selected button#myFitCarouselButton").val();
if (width !== myFit.menWidth) {
myFit.menWidth = width;
myFit.submitUserWidth(width);
}
})
}
myFit.passWidthValueFromCarouselWomen = function(){
myFit.$carouselWidthButtonWomen.bind("click", function(){
var self = this;
myFit.carouselButtonSelectionStyling("myFitWidthCarouselWomen", self);
var width = $("#myFitWidthCarouselWomen #myFitCarouselAUIButton.a-button-selected button#myFitCarouselButton").val();
if (width !== myFit.womenWidth) {
myFit.womenWidth = width;
myFit.submitUserWidth(width);
}
})
}
myFit.submitUserRegularSize = function(regularSize) {
myFit.regularSize = regularSize;
myFit.submitUserSize();
}
myFit.submitUserWidth = function(width){
myFit.width = width;
myFit.submitUserSize();
}
myFit.updateRecommendation = function(result) {
var headerText = null;
var showRecommendation = result.showRecommendation;
if (showRecommendation === "true") {
headerText = result.popoverTitle;
}
else {
headerText = result.errorMessage;
}
myFit.$recommendedSizeLinkText.text(result.recommendedSizeLinkText);
myFit.$recommendedSize.html($($("<textarea/>").html(result.titleRecommendation).text()));
myFit.$popoverTitle.html(headerText).append($($("<textarea/>").html(result.recommendation).text()));
myFit.$popoverBasisMessage.text(result.popoverBasisMessage);
myFit.$popoverExplanationMessage.text(result.popupMessageWithCustomerRegularSize);
myFit.$recFinderLink.text(result.fitFinderLink);
myFit.$recFinderAskRegularSize.removeClass("a-text-bold");
myFit.$recommendationData.attr("algo", result.algo);
myFit.$recommendationData.attr("rasin", result.recommendedAsin);
myFit.$recommendationData.attr("size", result.size);
myFit.$recommendationData.attr("rtype", result.recommendationMarker);
myFit.$recommendationData.attr("category", result.category);
myFit.$recommendationData.attr("directionality", result.directionality);
myFit.populateRecommendationData();
myFit.setupBaseUrl();
myFit.submitRecommendationGivenFeedback();
// These are required when the transition happens from conflicting directionality case to personalized case
myFit.$popoverHeader.show();
myFit.myFitPopoverExplanationMessageSection.show();
}
myFit.submitUserSize = function(data) {
var timeout = 5000;
var ajaxURL = myFit.parentURL;
var regularSize = myFit.regularSize;
var width = myFit.width;
if(regularSize === "-1") {
return;
}
var params = {
"asin" : myFit.pAsin,
"regularSize": regularSize,
"width": width
};
ajaxURL += "/fit-finder/ref=myfit_reg_size";
$.ajax({
url : ajaxURL,
type : 'POST',
data : params,
dataType : "json",
timeout : timeout,
beforeSend : function() {
myFit.$recFinderLoadMessage.show();
myFit.$recFinderClientErrorMessage.hide();
myFit.$recFinderServerErrorMessage.hide();
},
success : function(result) {
myFit.updateRecommendation(result);
},
error : function(xhr, status, error) {
var serverErrorRegex = /^([5][0-9][0-9])$/;
if (xhr.status === 0) {
myFit.$recFinderClientErrorMessage.show();
}
else if (serverErrorRegex.test(xhr.status)) {
myFit.$recFinderServerErrorMessage.show();
}
},
complete : function() {
myFit.$recFinderLoadMessage.hide();
},
});
//attach event after at least one ajax call.
A.on("a:popover:afterHide:myfitPopover", function(){
myFit.repaintFitFinder();
});
};
myFit.repaintFitFinder = function() {
myFit.$recFinder.hide();
myFit.$recFinderLink.show();
myFit.$recFinderClientErrorMessage.hide();
myFit.$recFinderServerErrorMessage.hide();
}
myFit.submitUserVoteFeedback = function(vote) {
var url = myFit.baseURL;
myFit.$recommendationSurvey.hide();
var params = {
"action" : "feedback",
"asin" : myFit.pAsin,
"vote" : vote
};
if (vote === myFit.yesVote) {
url += "/ref=myfit_fb_yes";
} else if (vote === myFit.noVote) {
url += "/ref=myfit_fb_no";
}
myFit.vote = vote;
myFit.retrySubmitting(url, params, 1, 3);
myFit.$recommendationSurveyComment.show();
};
myFit.submitUserComment = function() {
var url = myFit.baseURL;
var comment = myFit.$recommendationSurveyCommentBox.val();
myFit.$recommendationSurveyComment.hide();
var params = {
"action" : "comment",
"asin" : myFit.pAsin,
"vote" : myFit.vote,
"comment": comment
};
if (myFit.vote === myFit.yesVote) {
url += "/ref=myfit_fb_c_yes";
} else if (myFit.vote === myFit.noVote) {
url += "/ref=myfit_fb_c_no";
}
myFit.retrySubmitting(url, params, 1, 3);
myFit.$recommendationSurveyThankYou.show();
A.on("a:popover:afterHide:myfitPopover", function(){
myFit.$recommendationSurveyThankYou.hide();
});
};
myFit.populateRecommendationData = function() {
myFit.pAsin = myFit.$recommendationData.attr("asin");
myFit.directionality = myFit.$recommendationData.attr("directionality");
myFit.category = myFit.$recommendationData.attr("category");
myFit.rtype = myFit.$recommendationData.attr("rtype");
myFit.size = myFit.$recommendationData.attr("size");
myFit.rasin = myFit.$recommendationData.attr("rasin");
myFit.algo = myFit.$recommendationData.attr("algo");
};
myFit.setupBaseUrl = function() {
myFit.baseURL = myFit.parentURL;
myFit.baseURL += "/rAsin/" + myFit.rasin + "/size/" + myFit.size + "/algo/" + myFit.algo + "/dirn/" + myFit.directionality +
"/category/" + myFit.category + "/rtype/" + myFit.rtype ;
};
myFit.initialize = function () {
myFit.$recommendationData = $("#myFitRecommendationData");
myFit.populateRecommendationData();
myFit.parentURL = "/gp/myfit/aj/log";
myFit.yesVote = "Yes";
myFit.noVote = "No";
myFit.regularSize = "-1";
myFit.width = "NOTSPECIFIED";
myFit.womenRegularSize = "-1";
myFit.womenWidth = "NOTSPECIFIED";
myFit.menRegularSize = "-1";
myFit.menWidth = "NOTSPECIFIED";
myFit.areCarouselsInitialized = false;
myFit.$recommendedSizeLinkText = $("#myfitRecommendedSizeLinkText");
myFit.$recommendedSize = $("#myFitRecommendedSize");
myFit.$popoverDisplayLink = $("#myfitLink");
myFit.$popover = $("#myfitPopover");
myFit.$popoverHeader = $("#myFitPopoverHeader");
myFit.$popoverTitle = $("#myfitPopoverTitle");
myFit.$popoverBasisMessage = $("#myfitPopoverBasisMessage");
myFit.$popoverExplanationMessage = $("#myFitPopoverExplanationMessage");
myFit.myFitPopoverExplanationMessageSection = $("#myFitPopoverExplanationMessageSection");
myFit.$recFinder = $("#myFitRecFinder");
myFit.$recFinderLink = $("#myFitRecFinderLink");
myFit.$recFinderAskRegularSize = $("#myFitRecFinderAskRegularSize");
myFit.$recFinderLoadMessage = $("#myFitRecFinderLoadMessage");
myFit.$recFinderClientErrorMessage = $("#myFitRecFinderClientErrorMessage");
myFit.$recFinderServerErrorMessage = $("#myFitRecFinderServerErrorMessage");
myFit.$recommendationSurvey = $("#myFitRecommendationSurvey");
myFit.$recommendationSurveyCommentBox = $("#myFitRecommendationSurveyCommentBox");
myFit.$recommendationSurveyThankYou = $("#myFitRecommendationSurveyThankYou");
myFit.$recommendationSurveyComment = $("#myFitRecommendationSurveyComment");
myFit.$carouselSizeButtonMen = $("#myFitSizeCarouselMen #myFitCarouselAUIButton");
myFit.$carouselSizeButtonWomen = $("#myFitSizeCarouselWomen #myFitCarouselAUIButton");
myFit.$carouselWidthButtonMen = $("#myFitWidthCarouselMen #myFitCarouselAUIButton");
myFit.$carouselWidthButtonWomen = $("#myFitWidthCarouselWomen #myFitCarouselAUIButton");
myFit.$popoverDisplayLink.bind("mouseover touchstart", myFit.popoverDisplayLinkHandler);
myFit.$recFinderLink.bind("click touchstart", function(event) {
myFit.showFitFinder();
event.preventDefault();
});
A.on("a:tabs:myFitUnisexGenderSelector:myFitMen:select", function(data){
myFit.width =  myFit.menWidth;
myFit.regularSize = myFit.menRegularSize;
myFit.gotoPageInCarousel(myFit.$menCarousel, myFit.$menCarouselSelectedPage);
})
A.on("a:tabs:myFitUnisexGenderSelector:myFitWomen:select", function(data){
myFit.width =  myFit.womenWidth;
myFit.regularSize = myFit.womenRegularSize;
myFit.gotoPageInCarousel(myFit.$womenCarousel, myFit.$womenCarouselSelectedPage);
})
A.on("a:button-group:myFitWidthToggleGroupMen:toggle",function(data){
var width = data.selectedButton.buttonName;
if (width !== myFit.menWidth) {
myFit.menWidth = width;
myFit.submitUserWidth(myFit.menWidth);
}
})
A.on("a:button-group:myFitWidthToggleGroupWomen:toggle",function(data){
var width = data.selectedButton.buttonName;
if (width !== myFit.womenWidth) {
myFit.womenWidth = width;
myFit.submitUserWidth(myFit.womenWidth);
}
})
$("#myFitRecommendationVoteNo").bind("click", function() {
myFit.submitUserVoteFeedback(myFit.noVote);
});
$("#myFitRecommendationVoteYes").bind("click", function() {
myFit.submitUserVoteFeedback(myFit.yesVote);
});
$("#myFitRecommendationSurveyCommentSubmit").bind("click", function() {
myFit.submitUserComment();
});
myFit.setupCarousels();
myFit.setupBaseUrl();
myFit.submitRecommendationGivenFeedback();
};
myFit.initialize();
});