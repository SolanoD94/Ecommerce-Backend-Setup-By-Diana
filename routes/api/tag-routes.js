const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagsData) {
      res.status(404).json({ message: "No tags found with that ID" });
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tagsData = await Tag.create(req.body);
    console.log(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagsData = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: { id: req.params.id },
      }
    );
    console.log(tagsData);
    if (!tagsData) {
      res.status(404).json({ message: "No tag found with that id." });
      return;
    }
    res.status(200).json({ message: "Tag name changed" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagsData = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!tagsData) {
      res.status(404).json({ message: "No tag found with that id." });
      return;
    }
    console.log(tagsData);
    res.status(200).json({ message: "Tag deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
