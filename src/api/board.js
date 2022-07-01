import { apiInstance } from "./index.js";

const api = apiInstance();

function listArticle(param, success, fail) {
  api.get(`/board`, { params: param }).then(success).catch(fail);
}

function writeArticle(article, success, fail) {
  api.post(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

function getArticle(articleno, success, fail) {
  api.get(`/board/${articleno}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api
    .put(`/board/${article.articleno}`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

function deleteArticle(articleno, success, fail) {
  api.delete(`/board/${articleno}`).then(success).catch(fail);
}

function searchById(param, success, fail) {
  api.get(`/board/searchid`, { params: param }).then(success).catch(fail);
}

function searchBySubject(param, success, fail) {
  api.get(`/board/searchsubject`, { params: param }).then(success).catch(fail);
}

function modifyReply(article, success, fail) {
  api
    .put(`/board/updatereply/${article.articleno}`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

function deleteReply(article, success, fail) {
  api
    .put(`/board/deletereply/${article.articleno}`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

function updateHit(article, success, fail) {
  api
    .put(`/board/updatehit/${article.articleno}`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

export {
  listArticle,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
  searchById,
  searchBySubject,
  modifyReply,
  deleteReply,
  updateHit,
};
