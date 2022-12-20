## Starting the project

After you clone the project to your computer, ensure all packages are installed before you start the project.

server: `npm install`

Start the server `npm start`

## Basic Git Commands (aka Git101)

The **main** branch consists of production codes, which means *it should only contain codes that 100% work*. Please ensure your codes are well tested before merging codes into the **main** branch.

You should also run `npm install` after you switch branches.

### Naming a branch
It is important to name a branch *properly* so that you and other developers know what the purpose of having that branch is.

Good naming examples:
- features/edit-menu-page
- bugfix/incorrect-order-details


### Create a new branch *locally*
`git branch <new-branch-name>`

### Switching to another branch
`git checkout <branch-name>`

*You cannot switch branch unless all the modifications are committed. If you want to force switch branch, use `git checkout <branch-name> -f`*

### Check which branch you are currently in and see the list of existing branches
`git branch`

### Pulling and merging codes from remote main into local branch
Before pushing your codes, make sure your branch contains the most updated codes from the **main** branch (since someone may have merged their codes into the main branch while you are working on your own branch).
1. Make sure all the changes in your working branch is commited
2. Switch to your local main branch `git checkout main`
3. Pull the latest codes from the remote **main** branch `git pull` 
4. Switch back to your branch `git checkout <branch-name>`
5. Merge the codes from your local main branch into your branch `git merge main`
6. Resolve any conflicts
7. Commit again (if neccessary)
7. Push your codes to your remote branch `git push -u origin <branch-name>`

### Pushing codes to Github (remote)
1. Add all modifications to stage `git add .`
2. Commit with message `git commit -m '<your message>'`
3. Push codes to repo `git push origin -u <branch-name>`

*Please note that you MUST NOT push codes to the **main** branch. Pull request must be created if you want to merge your branch into the **main** branch*

## Pull Request
### Creating Pull Request
Before merging your codes into the **main** branch, you must create a pull request to let other team members look at your codes.

It is the best to mention what changes are made in your codes when you create a pull request.