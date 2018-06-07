# Hello_JS17
一个横版游戏demo
使用cocos2d-x 3.17创建
语言 js

______________________________________________________________________________________________________
## 配置Git

首先在本地创建ssh key;  <br>
**$ ssh-keygen -t rsa -C "your_email@youremail.com"**  <br>

后面的your_email@youremail.com改为你在github上注册的邮箱， <br>
之后会要求确认路径和输入密码，我们这使用默认的一路回车就行。 <br>
成功的话会在~/下生成.ssh文件夹，进去，打开id_rsa.pub，复制里面的key。 <br>

回到github上，进入 Account Settings（账户配置） ，<br>
左边选择SSH Keys，Add SSH Key,title随便填，粘贴在你电脑上生成的key。 <br>

为了验证是否成功，在git bash下输入： <br>
**$ ssh -T git@github.com**  <br>

如果是第一次的会提示是否continue，输入yes就会看到： <br>
You've successfully authenticated, but GitHub does not provide shell access 。<br>
这就表示已成功连上github。<br>

接下来我们要做的就是把本地仓库传到github上去，<br>
在此之前还需要设置username和email，因为github每次commit都会记录他们。<br>
**$ git config --global user.name "your name"**<br>
**$ git config --global user.email "your_email@youremail.com"** <br>

进入要上传的仓库，右键git bash，添加远程地址：(需要先在远程创建代码库，将本地库与远程库关联起来)<br>
**$ git remote add origin git@github.com:yourName/yourRepo.git** <br>
______________________________________________________________________________________________________
## git<br>
## 入门   http://www.runoob.com/w3cnote/git-guide.html  <br>

使用Git前，需要先建立一个仓库(repository)。您可以使用一个已经存在的目录作为Git仓库或创建一个空目录。<br>
使用您当前目录作为Git仓库，我们只需使它初始化。 <br>
**git init**<br>

使用我们指定目录作为Git仓库。 <br>
**git init newrepo** <br>

从现在开始，我们将假设您在Git仓库根目录下，除非另有说明。 <br>
______________________________________________________________________________________________________
## 添加新文件<br>
我们有一个仓库，但什么也没有，可以使用add命令添加文件。 <br>
**git add filename** <br>
可以使用add... 继续添加任务文件。 <br>
______________________________________________________________________________________________________
## 提交版本<br>
现在我们已经添加了这些文件，我们希望它们能够真正被保存在Git仓库。 <br>

为此，我们将它们提交到仓库。<br>
**git commit -m "Adding files"**  <br>
如果您不使用-m，会出现编辑器来让你写自己的注释信息。<br>

当我们修改了很多文件，而不想每一个都add，想commit自动来提交本地修改，我们可以使用-a标识。<br>
**git commit -a -m "Changed some files"**<br>
git commit 命令的-a选项可将所有被修改或者已删除的且已经被git管理的文档提交到仓库中。<br>
千万注意，-a不会造成新文件被提交，只能修改。<br>
______________________________________________________________________________________________________
## 发布版本<br>
我们先从服务器克隆一个库并上传。<br>
**git clone   git@github.com:cxly0845/xxx.git**<br>

现在我们修改之后可以进行推送到服务器。<br>
**git push git@github.com:cxly0845/xxx.git**<br>
______________________________________________________________________________________________________
## 取回更新<br>
如果您已经按上面的进行push，下面命令表示，当前分支自动与唯一一个追踪分支进行合并。<br>
**git pull**<br>

从非默认位置更新到指定的url。<br>
**git pull http://git.example.com/project.git**<br>

已经超过了五分钟？<br>
______________________________________________________________________________________________________
## 删除<br>
如何你想从资源库中删除文件，我们使用rm。<br>
**git rm file**<br>
______________________________________________________________________________________________________
## 分支与合并<br>
分支在本地完成，速度快。要创建一个新的分支，我们使用branch命令。<br>
**git branch test**<br>
branch命令不会将我们带入分支，只是创建一个新分支。<br>

所以我们使用checkout命令来更改分支。<br>
**git checkout test**<br>
第一个分支，或主分支，被称为"master"。<br>
**git checkout master**<br>

对其他分支的更改不会反映在主分支上。如果想将更改提交到主分支，则需切换回master分支，然后使用合并。<br>
**git checkout master**<br>
**git merge test**<br>

如果您想删除分支，我们使用-d标识。<br>
**git branch -d test** <br>

______________________________________________________________________________________________________
## 在github上只能删除仓库,却无法删除文件夹或文件, 所以只能通过命令来解决<br>

首先进入你的master文件夹下, Git Bash Here ,打开命令窗口<br>
**$ git --help 帮助命令**<br>

将远程仓库里面的项目拉下来<br>
**$ git pull origin master**<br>

查看有哪些文件夹<br>
**$ dir**  <br>

 删除target文件夹<br>
**$ git rm -r --cached target** <br>

提交,添加操作说明<br>
**$ git commit -m '删除了target'**<br>

将本次更改更新到github项目上去<br>
**$ git push -u origin master** <br>


