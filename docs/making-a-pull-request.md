# Making a Pull Request



## Making a Pull Request

1. Go to the project's webpage. Click on the "Fork" button on the upper-righthand side; you will be redirected to the page for your newly-created fork.
2. Click on the green button labelled "Clone or download" and copy the URL. In the terminal, `cd` into the directory on your machine you'd like to pull down the project into and enter the command `git clone <URL>` \(side note: git will automatically point to your fork by naming it `origin`\). From this point, your workflow will roughly be as follows:
   1. Create and checkout a feature branch. Be advised that your project manager may require a particular naming convention for branches.
   2. Make changes to the files.
   3. Commit your changes to the branch. Be sure to append your commit message with the issue number.
   4. Push up your commits to your fork \(origin\).
   5. Specify the upstream remote by using the command `git remote add upstream <URL_OF_ORIGINAL_REPO>`. You may find the URL by navigating to the repo's page and clicking on the green button labelled "Clone or download."
3. When you have finished implementing your new feature, it's time to push your changes to origin but before you do, merge in any new changes from upstream \(the original repository that you forked from\) by performing the following:
   1. Update your clone by running `git pull upstream master`. Resolve any merge conflicts as necessary.
   2. Push to origin using the `git push origin <BRANCH_NAME>` command.
   3. Sign into GitHub and navigate to your fork. You should see a button to initiate the pull request; click it. If all is well, a project maintainer will merge your request.

### References

* [About forks](https://help.github.com/en/articles/about-forks)
* [Creating a pull request from a fork](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork)
* [Atlassian's git tutorials](https://www.atlassian.com/git/tutorials)

