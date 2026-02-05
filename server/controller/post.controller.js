function getAllPost(req, res) {
  const status = req.valid;
  if (!status) {
    return res.json({
      error: true,
      message: "failed fetched all posts",
    });
  }
  return res.json({
    error: false,
    message: "fetched all posts",
    posts: [{ title: "Have a great dream", author: "Test user" }],
  });
}

export default getAllPost;
