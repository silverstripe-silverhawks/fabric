import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../components/Navbar';
import SettingsIcon from '../icons/settings.svg';


class Fabricator extends React.Component {
  constructor(props) {
    super(props);
    // unsure if this is the right way??
    const ROOT = document.querySelector('#fabricator-app');
    const allowedFields = JSON.parse(ROOT.getAttribute('allowed-fields'));
    const blocks = JSON.parse(ROOT.getAttribute('blocks'));
    const settings = JSON.parse(ROOT.getAttribute('settings'));
    const blockTypes = JSON.parse(ROOT.getAttribute('block-types'));

    this.state = {
      allowedFields,
      blocks,
      blockTypes,
      settings,
      hasBlocks: blocks.length > 0,

      showEditBlock: false,
      editBlockId: -1,
      editBlockInfo: [],
      addBlockInfo: [],
    };

    this.addBlock = this.addBlock.bind(this);
    this.highlightGlobal = this.highlightGlobal.bind(this);
    this.highlightBlock = this.highlightBlock.bind(this);
    this.removeHighlightBlock = this.removeHighlightBlock.bind(this);
    this.openBlock = this.openBlock.bind(this);
    this.closeBlock = this.closeBlock.bind(this);
    this.saveBlock = this.saveBlock.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  openBlock(e) {
    const editBlockId = e.target.id;
    // console.log(this.state.blocks);
    const blocks = this.state.blocks.filter(element => element.ID.value === parseInt(e.target.id, 10));
    this.setState({
      showEditBlock: true,
      editBlockId,
      editBlockInfo: blocks[0],
    });
  }

  highlightGlobal(e, element) {
    document.querySelector(`.${element}`).classList.add('fabricator-highlight');
  }
  highlightBlock(e) {
    const editBlockId = e.target.id;
    document.querySelector(`#e${editBlockId}`).classList.add('fabricator-highlight');
  }

  removeHighlightBlock(e) {
    const alreadyHighlighting = document.querySelector('.fabricator-highlight')
    if (alreadyHighlighting !== null) {
      alreadyHighlighting.classList.remove('fabricator-highlight');
    }
  }

  addBlock(e) {
    // get info from block schema
    this.setState({
      showEditBlock: true,
      editBlockId: -1
    });
  }

  closeBlock(e) {
    this.setState({
      showEditBlock: false,
      editBlockId: -1,
      editBlockInfo: [],
    });

    this.removeHighlightBlock();
  }

  // getBlockTypes() {
  //   fetch('/fabricator/api/getBlockTypes', {
  //     method: 'GET',
  //     credentials: 'same-origin',
  //   })
  //   .then(response => response.json())
  //   .then((data) => {
  //     this.setState({
  //       blockTypes: data,
  //     });
  //   });
  // }

  updateValue(e, key) {
    const value = e.target.value;
    this.setState(prevState => ({
      editBlockInfo: {
        ...prevState.editBlockInfo,
        [key]: {
          ...prevState.editBlockInfo[key],
          value,
        },
      },
    }));

    // update the dom element now...
    // this might require some re-thinking
    const id = this.state.editBlockId;
    let type = this.state.editBlockInfo[key].type.toLowerCase();
    const element = document.querySelector(`#e${id}`);

    // for demo purposes
    // this implementation is dangerous and not ideal.
    // it should be changed to a more robust solution
    // as it makes assumptions about the dom structure

    // https://www.npmjs.com/package/sanitize-html
    if (type === 'htmltext') type = 'content';
    element.querySelector(`[class*="__${type}"]`).innerHTML = value;
  }

  saveBlock() {
    console.log(this.state.editBlockInfo);
    fetch('/fabricator/api/saveBlock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(this.state.editBlockInfo),
    });
  }

  render() {
    const websiteTitle = this.state.settings.Title.value;
    const blocks = this.state.blocks;
    const renderBlocksList = () => {
      return (
        <div className="fabricator-nav-menu__container">
          <div className="fabricator-nav-menu-items">
            <div className="title">Global features</div>
            <div className="menu__item">
              <a
                role="button"
                tabIndex={0}
                onMouseEnter={(e) => this.highlightGlobal(e, 'header')}
                onMouseLeave={this.removeHighlightBlock}
              >
                Header
              </a>
            </div>

            <div className="menu__item">
              <a
                role="button"
                tabIndex={0}
                onMouseEnter={(e) => this.highlightGlobal(e, 'footer')}
                onMouseLeave={this.removeHighlightBlock}
              >
                Footer
              </a>
            </div>
          </div>
          <div className="fabricator-nav-menu-items">
            <div className="title">Page content</div>
            {blocks.map(block => {
              const blockTitle = block.Title.value;
              const blockType = block.Type.value;
              const key = block.ID.value;
              return (
                <div className="menu__item" key={key}>
                  <a role="button" tabIndex={0} onClick={this.openBlock} onMouseEnter={this.highlightBlock} onMouseLeave={this.removeHighlightBlock} id={key}>
                    <div className="menu__item__type">{blockType}</div>
                    <div className="menu__item__title">{blockTitle}</div>
                  </a>
                </div>
              );
            })}

            <div className="block-options">
              <button className="fabricator-button fabricator-button--blue" onClick={this.addBlock}>
                Add a block
              </button>
            </div>
          </div>
        </div>
      );
    };

    const renderEditBlock = () => {
      const newBlock = this.state.editBlockId === -1;
      const info = this.state.editBlockInfo;

      const getTitle = () => {
        if (this.state.editBlockId === -1) {
          return 'Add a block';
        }
        return this.state.editBlockInfo.Title.value;
      };

      const renderInput = (elementField, key) => {
        if (elementField.type === 'Boolean') {
          return <input type="checkbox" id={elementField.type} name={elementField.type} defaultChecked={parseInt(elementField.value, 10)} />;
        } else if (elementField.type === 'HTMLText') {
          return (
            <textarea
              className="text-field"
              rows="10"
              type="text"
              name={elementField.type}
              value={elementField.value}
              onChange={(e) => this.updateValue(e, key)}
            />
          );
        }
        return (
          <input
            className="text-field"
            type="text"
            name={elementField.type}
            value={elementField.value}
            onChange={(e) => this.updateValue(e, key)}
          />
        );

      };

      const renderNewBlock = () => {
        const blockTypes = this.state.blockTypes;

        return (
          <div className="fabricator-input">
            <label htmlFor="Title">Title</label>
            <select className="select-field" value="Content">
              { blockTypes.map(ele => <option key={ele.Title} value={ele.Title}>{ele.Title}</option>)}
            </select>
          </div>
        );
      };

      const renderEditBlockFields = () => {
        return Object.keys(this.state.editBlockInfo).map((eleKey, index) => {
          if (eleKey !== 'ID' && eleKey !== 'Type') {
            const elementField = this.state.editBlockInfo[eleKey];
            return (
              <div key={index} className="fabricator-input">
                <div className="label">{ eleKey }</div>
                { renderInput(elementField, eleKey) }
              </div>
            );
          }
        });
      };

      const renderFields = () => {
        if (newBlock) {
          return renderNewBlock();
        }
        return renderEditBlockFields();
      };

      return (
        <div className="fabricator-edit-block">
          <div className="fabricator-edit-block__header">
            <div className="options">
              <div className="title">Edit</div>
              <button className="fabricator-button fabricator-button--right" onClick={this.closeBlock}>Cancel</button>
            </div>
            <div className="title">{getTitle()}</div>
          </div>
          <div className="fabricator-input__block">
            { renderFields() }

            <div className="fabricator-edit-block-content-footer">
              <button className="fabricator-button fabricator-button--outline-green" onClick={this.saveBlock}>Save</button>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div>
        <div className="fabricator-sidebar">
          <nav className="fabricator-nav-menu">
            <div className="fabricator-menu-title">
              <h3>{websiteTitle}</h3>
              <h5>View site tree</h5>
            </div>

            {this.state.showEditBlock ? renderEditBlock() : renderBlocksList() }

            <div className="fabricator-page-settings">
              <button className="fabricator-button fabricator-button--default">
                Page settings
              </button>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

window.document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Fabricator />,
    document.getElementById('fabricator-app')
  );
});
