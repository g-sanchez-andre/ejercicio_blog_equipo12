/**
 * Este archivo se utiliza en un proyecto donde se está utlizando server-side
 * rendering (ej: con un motor de templates como EJS). Tiene como objetivo
 * mostrar (renderear) páginas que no están directamente relacionandas con
 * una entidad del proyecto.
 *
 * Ejemplos:
 *   - Página de inicio (Home).
 *   - Página de contacto.
 *   - Página con política de privacidad.
 *   - Página con términos y condiciones.
 *   - Página con preguntas frecuentes (FAQ).
 *   - Etc.
 *
 * En caso de estar creando una API, este controlador carece de sentido y
 * no debería existir.
 */

const { Article, User } = require("../models");

async function showHome(req, res) {
  const article = await Article.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "firstname", "lastname"],
      },
    ],
  });

  // res.json(article);
  res.render("home", {
    article: article,
  });
}

/*============= sin uso =============*/
async function showPanel(req, res) {
  res.render("newArticle");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}
/*============= sin uso =============*/
// Otros handlers...
// ...

module.exports = {
  showHome,
  showPanel,
  showAboutUs,
};
