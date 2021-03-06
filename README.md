Thankful For
===========

Live site at http://www.brianmorrow.net/playground/thankfulfor

A simple site built using Backbone.js, Node.js, Require.js and the express framework.


Repo Layout
----------

node_modules/                       - Any Node modules packaged with the app
public/                             - Includes all html templates, js files and css
views/                              - Includes jade html templates for node
models/                             - Includes data models for node
package.json                        - npm package descriptor.
npm_global_module_list              - List of globally installed node modules
                                      (on OpenShift)
.openshift/                         - Location for openshift specific files
.openshift/action_hooks/pre_build   - Script that gets run every git push before
                                      the build
.openshift/action_hooks/build       - Script that gets run every git push as
                                      part of the build process (on the CI
                                      system if available)
.openshift/action_hooks/deploy      - Script that gets run every git push after
                                      build but before the app is restarted
.openshift/action_hooks/post_deploy - Script that gets run every git push after


The MIT License (MIT)
--------------------
Copyright (c) 2013 Brian Morrow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
