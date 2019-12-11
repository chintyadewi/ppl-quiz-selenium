require("chromedriver");
const assert = require("assert");
const { Builder, Key, By, until } = require("selenium-webdriver");

(async function search() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get(
    "https://s2.demo.opensourcecms.com/orangehrm/symfony/web/index.php/auth/login"
  );
  await driver.findElement(By.id("txtUsername")).click();
  await driver.findElement(By.id("txtUsername")).sendKeys("opensourcecms");

  await driver.findElement(By.id("txtPassword")).click();
  await driver
    .findElement(By.id("txtPassword"))
    .sendKeys("opensourcecms", Key.RETURN);

  var expected, actual;
  expected = "Welcome Admin";

  try {
    await driver.wait(until.elementLocated(By.id("option-menu")), 10000);
    await driver
      .findElement(By.css("#option-menu>:first-child"))
      .getText()
      .then(textRole => {
        actual = textRole;
      });
  } catch (error) {
    actual = "Cannot get element";
  }

  try {
    assert.equal(actual, expected);
    console.log(
      "Test Login" + "\nPass\n actual: ",
      actual,
      "\n expected: ",
      expected
    );
  } catch (error) {
    console.log(
      "Test Login" + "\nFail\n message: ",
      actual,
      "\n expected: ",
      expected
    );
  }
})();
