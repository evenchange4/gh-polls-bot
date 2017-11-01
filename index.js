module.exports = (robot) => {
  // Your code here
  console.log('Yay, the app was loaded!')
  robot.on("issues.opened", async context => {
    // An issue was just opened.
    console.log("issues.opened");
    robot.log(context);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
