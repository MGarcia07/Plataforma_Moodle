/**
 * TinyMCE plugin MoodleEmoticon - provides GUI to insert emoticon images.
 *
 * Based on the example plugin (c) 2009 Moxiecode Systems AB.
 *
 * @author  David Mudrak <david@moodle.com>
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
(function(){tinymce.create('tinymce.plugins.MoodleEmoticon',{_emoticons:{},init:function(ed,url){ed.addCommand('mceMoodleEmoticon',function(){lang=ed.getParam('language');ed.windowManager.open({file:ed.getParam("moodle_plugin_base")+'moodleemoticon/dialog.php?lang='+lang,width:250+parseInt(ed.getLang('moodleemoticon.delta_width',0)),height:400+parseInt(ed.getLang('moodleemoticon.delta_height',0)),inline:1},{plugin_url:url})});ed.onInit.add(function(ed){var data=ed.getContent();this._emoticons=tinymce.util.JSON.parse(ed.getParam('moodleemoticon_emoticons'));for(var emotxt in this._emoticons){search=emotxt.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,'\\$&');search=new RegExp(search,'g');data=data.replace(search,this._emoticons[emotxt])}
ed.setContent(data)});ed.onPreProcess.add(function(ed,o){if(o.save){tinymce.each(ed.dom.select('img.emoticon',o.node),function(image){var emoticontxt='';if(image.classList.contains('emoticon')){var matches=/emoticon-index-([0-9]+)/.exec(image.className);if(!matches){return!0}
var index=matches[1];var search=new RegExp('emoticon-index-'.concat(index,'"'));for(var emotxt in this._emoticons){if(search.test(this._emoticons[emotxt])){emoticontxt=emotxt;break}}
if(emoticontxt){ed.dom.setOuterHTML(image,emoticontxt)}}},this)}});ed.addButton('moodleemoticon',{title:'moodleemoticon.desc',cmd:'mceMoodleEmoticon',image:url+'/img/moodleemoticon.png'})},createControl:function(n,cm){return null},getInfo:function(){return{longname:'Moodle Emoticon plugin',author:'David Mudrak',authorurl:'http://mudrak.name',infourl:'http://moodle.org',version:"1.0"}}});tinymce.PluginManager.add('moodleemoticon',tinymce.plugins.MoodleEmoticon)})()