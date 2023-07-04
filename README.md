# MOCK_TEST_API
It a Backend for [Mock Test APP](https://github.com/kumarvikramshahi/Mock_Test_APP)
* A Exam system to operate on Android phone even without internet connection.
* User just need to download the question paper and they can practise them whenever they want even without internet connection.
* The exam will simulate like real online exam on the phone itself.

## Technology Stack
* NodeJS (Runtime env)
* Express.js (server)
* MongoDB (DB)
* Mongoos (Mongodb ORM)

## Local Installation
* Go to folder where you want install this repo.
* Right click and you will get some options.
* Click on ' Git Bash Here ' and you will get a linux like CLI.
* Clone repositary (below step is for https method, for ssh way copy link from code button)
```
git clone https://github.com/kumarvikramshahi/mock_test_api.git
```
* Change directory to repo
```
cd mock_test_api
```
* Install dependencies
```
npm install
```
* Start server
```
npm start
```

### This API will serve following endpoints:-
* `/practice_paper/fetch/` = to fetch Practice papers
* `/practice_paper/post/` = to add Practice papers
* `/practice_paper/edit/` = to edit Practice papers
* `/practice_paper/question/add/` = to add questions in question paper
* `/practice_paper/question/edit` = to edit questions in question paper
* `/practice_paper/question/delete` = delete questions in question paper
