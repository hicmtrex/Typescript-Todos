import FullList from '../model/FullList';

interface DomList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

class ListTemplete implements DomList {
  ul: HTMLUListElement;

  static instance: ListTemplete = new ListTemplete();
  private constructor() {
    this.ul = document.getElementById('listItems') as HTMLUListElement;
  }
  clear(): void {
    this.ul.innerHTML = '';
  }
  render(fullList: FullList): void {
    this.clear();
    fullList.list.forEach((item) => {
      const li = document.createElement('li') as HTMLLIElement;

      li.className = 'item';

      const check = document.createElement('input') as HTMLInputElement;
      check.type = 'checkbox';
      check.id = item.id;
      check.tabIndex = 0;
      check.checked = item.checked;
      li.append(check);

      check.addEventListener('change', () => {
        item.checked = !item.checked;
        fullList.save();
      });
      const label = document.createElement('label') as HTMLLabelElement;

      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      const button = document.createElement('button') as HTMLButtonElement;

      button.className = 'button';
      button.textContent = 'X';
      li.append(button);
      button.addEventListener('click', () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      this.ul.append(li);
    });
  }
}

export default ListTemplete;
