/**
 *  test plugin for Movian
 *
 *  Copyright (C) 2019 
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
//ver 0.0.1

// parsit plugin.json
var plugin = JSON.parse(Plugin.manifest);
var PREFIX = plugin.id;
var LOGO = Plugin.path + plugin.icon;
var UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36';

var page = require('movian/page');
var http = require('movian/http');
var settings = require('movian/settings');

// Create the service (ie, icon on home screen)
require('movian/service').create(plugin.title, PREFIX + ":start", "video", true, LOGO);
settings.globalSettings(plugin.id, plugin.title, LOGO, plugin.synopsis);
settings.createInfo("info", LOGO, "Plugin developed by " + plugin.author);
settings.createDivider("Settings:");
settings.createString("domain", "Адресс:", "http://glazandroid.com/andr/chas-json.php", function (v) {
    settings.domain = v;
});

// Landing page
new page.Route(PREFIX + ":start", function (page) {
  page.type = "directory";
  page.metadata.title = PREFIX;
  page.metadata.icon = LOGO;
  res = http.request(settings.domain, {
    headers: {
      'User-Agent': UA
    }
  });
  res = JSON.parse(res.toString());
  for (var i = 0; i < res.channels.length; i++) {
    item = res.channels[i];
    page.appendItem(item.stream, 'video', {
      title: item.name,
      icon: item.logo
    });
  }
});