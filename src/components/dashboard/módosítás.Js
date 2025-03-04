//*[@id="document-edit"]/div[1]/div[2]/div/div[2]/ul/div/li[1]/div/div[1]/div[3]/div/div/span/span[1]/span
//*[@id="document-edit"]/div[1]/div[2]/div/div[2]/ul/div/li[2]/div/div[1]/div[3]/div/div/span/span[1]/span
//*[@id="document-edit"]/div[1]/div[2]/div/div[2]/ul/div/li[3]/div/div[1]/div[3]/div/div/span/span[1]/span
let i = 1;
while (true) {
  const xpath = `//*[@id="document-edit"]/div[1]/div[2]/div/div[2]/ul/div/li[${i}]/div/div[1]/div[3]/div/div/span/span[1]/span`;

  const result = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );

  const element = result.singleNodeValue;

  if (element) {
    element.dispatchEvent(
      new MouseEvent("mousedown", { bubbles: true, cancelable: true })
    );
    element.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: true, cancelable: true })
    );
    element.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true })
    );
    i += 1;
  } else {
    break;
  }

  const li = document.querySelector("li[id*='AAM']");

  if (li) {
    li.dispatchEvent(
      new MouseEvent("mousedown", { bubbles: true, cancelable: true })
    );
    li.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: true, cancelable: true })
    );
    li.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true })
    );
  }
}

const selectedTaxType = document.querySelector(
  'input[value="NO_TAX_NUMBER"]:checked'
);
console.log(selectedTaxType ? true : "Nincs kiválasztva");

if (selectedTaxType === true) {
  const kuldes = document.querySelector("label[for=is_match-no]");
  console.log(kuldes);
  if (kuldes) {
    kuldes.dispatchEvent(
      new MouseEvent("mousedown", { bubbles: true, cancelable: true })
    );
    kuldes.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: true, cancelable: true })
    );
    kuldes.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true })
    );
  }
  kuldes.click();
}

const comment = document.getElementById("document-comment");
const num = "000323";
comment.value = `ALK-2025/${num} -es bizonylat módosítása a vállalkozás Áfakör változása miatt. \n Önnek ezzel teendője nincs.`;
