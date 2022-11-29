import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplete from './templets/ListTemplet';

const initApp = (): void => {
  const fullList = FullList.instance;
  const templet = ListTemplete.instance;

  const itemEntryForm = document.getElementById(
    'itemEntryForm'
  ) as HTMLFormElement;

  itemEntryForm.addEventListener('submit', (e: SubmitEvent): void => {
    e.preventDefault();

    const input = document.getElementById('newItem') as HTMLInputElement;
    const newEntryText: string = input.value.trim();

    if (!newEntryText.length) return;

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    const newItem = new ListItem(itemId.toString(), newEntryText);
    fullList.addItem(newItem);

    templet.render(fullList);
    input.value = '';
  });

  const clearItems = document.getElementById(
    'clearItemsButton'
  ) as HTMLButtonElement;

  clearItems.addEventListener('click', (): void => {
    fullList.clearList();
    templet.clear();
  });

  fullList.load();
  templet.render(fullList);
};

document.addEventListener('DOMContentLoaded', initApp);
