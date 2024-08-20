// Author: Artem Nikulin

exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'Prologix - Головна',
  });
};
