exports.get404Page = (_req, res, _next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
}