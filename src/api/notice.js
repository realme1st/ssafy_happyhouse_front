import { apiInstance } from "./index.js";

const api = apiInstance();

function listArticle(param, success, fail) {
  api.get(`/notice`, { params: param }).then(success).catch(fail);
}

function writeArticle(article, success, fail) {
  api.post(`/notice`, JSON.stringify(article)).then(success).catch(fail);
}

function getArticle(articleno, success, fail) {
  api.get(`/notice/${articleno}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api
    .put(`/notice/${article.articleno}`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

function deleteArticle(articleno, success, fail) {
  api.delete(`/notice/${articleno}`).then(success).catch(fail);
}

function searchById(param, success, fail) {
  api.get(`/notice/searchid`, { params: param }).then(success).catch(fail);
}

function searchBySubject(param, success, fail) {
  api.get(`/notice/searchsubject`, { params: param }).then(success).catch(fail);
}

function updateHit(article, success, fail) {
  api
    .put(`/notice/updatehit/${article.articleno}`, JSON.stringify(article))
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
  updateHit,
};
