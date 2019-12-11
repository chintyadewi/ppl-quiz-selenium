require("chromedriver");
const assert = require("assert");
const { Builder, Key, By, until } = require("selenium-webdriver");

(async function search() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://demo.1crmcloud.com/login.php");
  await driver.findElement(By.id("login_user")).click();
  await driver.findElement(By.id("login_user")).sendKeys("admin");

  await driver.findElement(By.id("login_pass")).click();
  await driver.findElement(By.id("login_pass")).sendKeys("admin", Key.RETURN);

  await driver.wait(until.elementLocated(By.className("default-avatar")));
  await driver.findElement(By.className("default-avatar")).click();

  var expected, actual;
  expected = "admin";

  try {
    await driver.wait(until.elementLocated(By.id("_form_subheader")), 10000);
    await driver
      .findElement(By.css("#_form_subheader>h4"))
      .getText()
      .then(textRole => {
        let arr = textRole.split(" ");
        actual = arr[2];
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
