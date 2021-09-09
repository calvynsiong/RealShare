const mapUserInfo = (user) =>
  user.map(({ _id, username, avatar, email }) => {
    return {
      id: _id.toString(),
      username: username,
      avatar: avatar,
      email: email,
    };
  });

module.exports = mapUserInfo;
