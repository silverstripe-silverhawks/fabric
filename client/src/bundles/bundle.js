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

    this.state = {
      allowedFields,
      blocks,
      settings,
      hasBlocks: blocks.length > 0,

      showEditBlock: false,
      editBlockId: -1,
      editBlockInfo: [],
    };

    this.addBlock = this.addBlock.bind(this);
    this.openBlock = this.openBlock.bind(this);
    this.closeBlock = this.closeBlock.bind(this);
  }

  openBlock(e) {
    const editBlockId = e.target.id;
    const blocks = this.state.blocks.filter(element => element.ID.value === parseInt(e.target.id, 10));
    this.setState({
      showEditBlock: true,
      editBlockId,
      editBlockInfo: blocks[0],
    });
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
  }

  render() {
    const websiteTitle = this.state.settings.Title.value;
    const blocks = this.state.blocks;
    const renderBlocksList = () => {
      return (
        <div className="fabricator-nav-menu-items">
          <div className="title">Page content</div>
          {blocks.map(block => {
            const blockTitle = block.Title.value;
            const key = block.ID.value;
            return (
              <div className="menu__item" key={key}>
                <a role="button" tabIndex={0} onClick={this.openBlock} id={key}>{blockTitle}</a>
              </div>
            );
          })}

          <div className="block-options">
            <button className="fabricator-button fabricator-button--blue" onClick={this.addBlock}>
              Add a block
            </button>
          </div>
        </div>
      );
    };

    const renderEditBlock = () => {
      const info = this.state.editBlockInfo;

      const getTitle = () => {
        if (this.state.editBlockId === -1) {
          return 'Add a block';
        }
        return this.state.editBlockInfo.Title.value;
      };

      const renderField = (elementField) => {
        if (elementField.type === 'Boolean') {
          return <input type="checkbox" id={elementField.type} name={elementField.type} defaultChecked={parseInt(elementField.value, 10)} />;
        } else if (elementField.type === 'HTMLText') {
          return <textarea className="text-field" type="text" name={elementField.type} value={elementField.value} />;
        }

        return <input className="text-field" type="text" name={elementField.type} value={elementField.value} />
      }

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
            {
              Object.keys(this.state.editBlockInfo).map((eleKey, index) => {
                const elementField = this.state.editBlockInfo[eleKey];
                return (
                  <div key={index} className="fabricator-input">
                    <div className="label">{ eleKey }</div>
                    { renderField(elementField) }
                  </div>
                )
              })
            }
            {/* <div className="fabricator-input">
              <div className="label">Title</div>
              <input type="text" className="text-field" />
            </div>
            <div className="fabricator-input">
              <div className="label">Body</div>
              <textarea className="textarea-field" />
            </div> */}
            <div className="fabricator-edit-block-content-footer">
              <button className="fabricator-button fabricator-button--outline-green">Save</button>
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
