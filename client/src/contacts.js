import React from 'react';
import {
  Nav,
  Stack,
  BaseComponent,
  DetailsHeader,
  DetailsList,
  mergeStyles,
  CommandButton,
} from 'office-ui-fabric-react';

function Contacts() {
  return (
    <Stack horizontal>
      <Stack>
        <NavBasicExample />
      </Stack>
      <Stack>
        <DetailsListGroupedExample />
      </Stack>
      <Stack grow>Detail</Stack>
    </Stack>
  );
}

export const NavBasicExample = () => {
  return (
    <Nav
      onLinkClick={_onLinkClick}
      selectedKey="key3"
      expandButtonAriaLabel="Expand or collapse"
      styles={{
        root: {
          width: 208,
          height: 350,
          boxSizing: 'border-box',
          border: '1px solid #eee',
          overflowY: 'auto',
        },
      }}
      groups={[
        {
          links: [
            {
              name: 'Favourites',
              url: '/favs',
              key: 'favs',
              icon: 'FavoriteStar',
              isExpanded: true,
            },
            {
              name: 'My contacts',
              links: [
                {
                  name: 'All Contacts',
                  url: '/contacts',
                  key: 'all-contacts',
                  icon: 'Contact',
                },
                {
                  name: 'Deleted Contacts',
                  url: '/contacts/deleted',
                  disabled: true,
                  icon: 'Delete',
                  key: 'deleted-contacts',
                },
                {
                  name: 'Blocked Contacts',
                  url: '/contacts/blocked',
                  icon: 'PeopleBlock',
                  key: 'blocked-contacts',
                },
              ],
              isExpanded: true,
            },
          ],
        },
      ]}
    />
  );
};

function _onLinkClick(ev, item) {
  if (item && item.name === 'News') {
    alert('News link clicked');
  }
}

const margin = '0 20px 20px 0';
const controlWrapperClass = mergeStyles({
  display: 'flex',
  flexWrap: 'wrap',
});

const _blueGroupIndex = 2;

export class DetailsListGroupedExample extends BaseComponent {
  _root = React.createRef();
  _columns;

  constructor(props) {
    super(props);

    this.state = {
      items: [
        { key: 'a', name: 'Akinmade Bond', color: 'red' },
        { key: 'b', name: 'b', color: 'red' },
        { key: 'c', name: 'c', color: 'blue' },
        { key: 'd', name: 'd', color: 'blue' },
        { key: 'e', name: 'e', color: 'blue' },
      ],
      // This is based on the definition of items
      groups: [
        { key: 'groupred0', name: 'A', startIndex: 0, count: 2 },
        { key: 'groupgreen2', name: 'B"', startIndex: 2, count: 0 },
        { key: 'groupblue2', name: 'C', startIndex: 2, count: 3 },
      ],
      showItemIndexInView: false,
      isCompactMode: false,
    };

    this._columns = [
      {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
      },
    ];
  }

  componentWillUnmount() {
    if (this.state.showItemIndexInView) {
      const itemIndexInView = this._root.current.getStartItemIndexInView();
      alert('first item index that was in view: ' + itemIndexInView);
    }
  }

  render() {
    const { items, groups, isCompactMode } = this.state;

    return (
      <div>
        <div className={controlWrapperClass}>
          <CommandButton
            onClick={this._addItem}
            text="Add Contact"
            iconProps={{ iconName: 'Add' }}
            styles={{ root: { margin: margin } }}
          />
        </div>
        <DetailsList
          componentRef={this._root}
          items={items}
          groups={groups}
          columns={this._columns}
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          ariaLabelForSelectionColumn="Toggle selection"
          onRenderDetailsHeader={this._onRenderDetailsHeader}
          groupProps={{
            showEmptyGroups: true,
          }}
          onRenderItemColumn={this._onRenderColumn}
        />
      </div>
    );
  }

  _addItem = () => {
    const items = this.state.items;
    const groups = [...this.state.groups];
    groups[_blueGroupIndex].count++;

    this.setState(
      {
        items: items.concat([
          {
            key: 'item-' + items.length,
            name: 'New item ' + items.length,
            color: 'blue',
          },
        ]),
        groups,
      },
      () => {
        if (this._root.current) {
          this._root.current.focusIndex(items.length, true);
        }
      },
    );
  };

  _onRenderDetailsHeader(props, _defaultRender) {
    return (
      <DetailsHeader
        {...props}
        ariaLabelForToggleAllGroupsButton={'Expand collapse groups'}
      />
    );
  }

  _onRenderColumn(item, index, column) {
    const value =
      item && column && column.fieldName ? item[column.fieldName] || '' : '';

    return <div data-is-focusable={true}>{value}</div>;
  }

  _onShowItemIndexInViewChanged = (event, checked) => {
    this.setState({ showItemIndexInView: checked });
  };

  _onChangeCompactMode = (ev, checked) => {
    this.setState({ isCompactMode: checked });
  };
}

export default Contacts;
