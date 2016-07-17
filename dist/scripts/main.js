"use strict";var showQuestion=function(e){var t=$(".templates .question").clone(),r=t.find(".question-text a");r.attr("href",e.link),r.text(e.title);var s=t.find(".asked-date"),n=new Date(1e3*e.creation_date);s.text(n.toString());var a=t.find(".viewed");a.text(e.view_count);var o=t.find(".asker");return o.html('<p>Name: <a target="_blank" href=//stackoverflow.com/users/'+e.owner.user_id+" >"+e.owner.display_name+"</a></p><p>Reputation: "+e.owner.reputation+"</p>"),t},showSearchResults=function(e,t){var r=t+" results for <strong>"+e+"</strong>";return r},showError=function(e){var t=$(".templates .error").clone(),r="<p>"+e+"</p>";t.append(r)},getUnanswered=function(e){var t={tagged:e,site:"stackoverflow",order:"desc",sort:"creation"};$.ajax({url:"//api.stackexchange.com/2.2/questions/unanswered",data:t,dataType:"jsonp",type:"GET"}).done(function(e){var r=showSearchResults(t.tagged,e.items.length);$(".search-results").html(r),$.each(e.items,function(e,t){var r=showQuestion(t);$(".results").append(r)})}).fail(function(e,t){var r=showError(t);$(".search-results").append(r)})},showAnswerer=function(e){var t=$(".templates .top-answerers").clone();return t.find("img").attr("src",e.user.profile_image),t.find(".user-text").text(e.user.display_name),t.find(".score-text").text(e.score),t.find(".posts-text").text(e.post_count),t},getTopAnswerers=function(e){var t={site:"stackoverflow"};$.ajax({url:"//api.stackexchange.com/2.2/tags/"+e+"/top-answerers/all_time",data:t,dataType:"jsonp",type:"GET"}).done(function(t){var r=showSearchResults(e,t.items.length);$(".search-results").html(r),$.each(t.items,function(e,t){var r=showAnswerer(t);$(".results").append(r)})}).fail(function(e,t){var r=showError(t);$(".search-results").append(r)})};$(document).ready(function(){$(".unanswered-getter").submit(function(e){e.preventDefault(),$(".results").html("");var t=$(this).find("input[name='tags']").val();getUnanswered(t)}),$(".inspiration-getter").submit(function(e){e.preventDefault(),$(".search-results").html(""),$(".results").html("");var t=$(this).find("input[name='answerers']").val();getTopAnswerers(t)})});