// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('juju', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('juju', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect(1294, 741)
    await driver.findElement(By.css(".userName > p")).click()
    await driver.findElement(By.name("cuenta")).click()
    await driver.findElement(By.name("cuenta")).sendKeys("lucio_benedettelli@gmail.com")
    await driver.sleep(1000)
    await driver.findElement(By.name("password")).click()
    await driver.findElement(By.name("password")).sendKeys("bootcamp123")
    await driver.sleep(1000)
    await driver.findElement(By.css(".guardaCambioContrase\\F1 a > p")).click()
    await driver.sleep(1000)
    await driver.findElement(By.css("svg:nth-child(3)")).click()
    await driver.sleep(1000)
    await driver.findElement(By.linkText("Editar Usuario")).click()
    await driver.findElement(By.css(".editUsuario:nth-child(2) > .guardaCambioContrase\\F1 a")).click()
    await driver.sleep(1000)
    assert(await driver.findElement(By.css(".errores > h2")).getText() == "¡Todos los campos son requeridos!")
    await driver.findElement(By.name("passwordAnterior")).click()
    await driver.findElement(By.name("passwordAnterior")).sendKeys("bootcamp123")
    await driver.findElement(By.name("repetirPassword")).click()
    await driver.findElement(By.name("repetirPassword")).sendKeys("bootcamp1234")
    await driver.findElement(By.name("password")).click()
    await driver.findElement(By.name("password")).sendKeys("ca")
    assert(await driver.findElement(By.css(".errores > h2")).getText() == "¡Las contraseñas no coinciden!")
    await driver.findElement(By.css(".editUsuario:nth-child(2)")).click()
    await driver.findElement(By.css(".editUsuario:nth-child(2)")).click()
    await driver.findElement(By.name("repetirPassword")).sendKeys("bootcamp123")
    await driver.findElement(By.name("password")).click()
    await driver.findElement(By.name("password")).sendKeys("mindhub20")
    await driver.findElement(By.css(".editUsuario:nth-child(2) > .guardaCambioContrase\\F1 a > p")).click()
    assert(await driver.findElement(By.css(".errores > h2")).getText() == "¡Se han guardado los cambios de manera exitosa!")
    await driver.close()
  })
})