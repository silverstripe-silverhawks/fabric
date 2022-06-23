import React from 'react';
import ViewBlock from './components/ViewBlock';
import NewBlock from './components/NewBlock';
import PageSettings from './components/PageSettings';

class Fabric extends React.Component {
  constructor(props) {
    super(props);

    // unsure if this is the right way??
    const ROOT = document.querySelector('#fabricator-app');
    const username = ROOT.getAttribute('username');

    const allowedFields = JSON.parse(ROOT.getAttribute('allowed-fields'));
    const blocks = JSON.parse(ROOT.getAttribute('blocks'));
    const settings = JSON.parse(ROOT.getAttribute('settings'));
    const blockTypes = JSON.parse(ROOT.getAttribute('block-types'));
    const pageFields = JSON.parse(ROOT.getAttribute('page-fields'));

    this.state = {
      username,
      pageFields,
      allowedFields,
      blocks,
      blockTypes,
      settings,
      viewState: 'home',
      editBlockInfo: [],
    };

    this.changeView = this.changeView.bind(this);
    this.highlightGlobal = this.highlightGlobal.bind(this);
    this.highlightBlock = this.addHighlight.bind(this);
    this.removeHighlightBlock = this.removeHighlight.bind(this);
    this.openBlock = this.openBlock.bind(this);
  }

  componentDidMount() {
  }

  /**
   * A helper function that handles and changes the sidebar view state
   * Supports addBlock, editBlock and pageSettings
   *
   * @param string view
   * @param boolean clearEditState
   */
  changeView(view, clearEditState = false) {
    this.setState({
      viewState: view,
      editBlockInfo: clearEditState ? [] : this.state.editBlockInfo,
    });

    if (clearEditState) {
      document.querySelector('.fabricator-open').classList.remove('fabricator-open');
      this.removeHighlight();
    }
  }

  openBlock(e) {
    this.removeHighlight(e);
    const editBlockId = e.target.id;
    document.querySelector(`#e${editBlockId}`).classList.add('fabricator-open');
    const blocks = this.state.blocks.filter(element => element.ID.value === parseInt(e.target.id, 10));

    this.setState({
      viewState: 'editBlock',
      editBlockInfo: blocks[0],
    });
  }

  highlightGlobal(e, element) {
    document.querySelector(`.${element}`).classList.add('fabricator-highlight');
  }

  addHighlight(e) {
    const editBlockId = e.target.id;
    document.querySelector(`#e${editBlockId}`).classList.add('fabricator-highlight');
  }

  removeHighlight(e) {
    const alreadyHighlighting = document.querySelector('.fabricator-highlight');
    if (alreadyHighlighting !== null) {
      alreadyHighlighting.classList.remove('fabricator-highlight');
    }
  }


  render() {
    const websiteTitle = this.state.settings.Title.value;
    const blocks = this.state.blocks;
    const renderHomeView = () => {
      return (
        <div className="fabricator__content">
          <div className="fabricator__navigation">
            <div className="content">
              <div className="title">Global features</div>
              <TextField name="text" />
            </div>
            <div className="menu__item">
              <a
                role="button"
                tabIndex={0}
                onMouseEnter={(e) => this.highlightGlobal(e, 'header')}
                onMouseLeave={this.removeHighlight}
              >
                Header
              </a>
            </div>

            <div className="menu__item">
              <a
                role="button"
                tabIndex={0}
                onMouseEnter={(e) => this.highlightGlobal(e, 'footer')}
                onMouseLeave={this.removeHighlight}
              >
                Footer
              </a>
            </div>
          </div>
          <div className="fabricator__navigation">
            <div className="content">
              <div className="title">Page content</div>
              {blocks.length === 0 && <div>No blocks on this page</div>}
            </div>

            {blocks.map(block => {
              console.log(block);
              const blockTitle = block.Type.value;
              const blockType = block.Type.value;
              const key = block.ID.value;
              return (
                <div className="menu__item" key={key}>
                  <a role="button" tabIndex={0} onClick={this.openBlock} onMouseEnter={this.addHighlight} onMouseLeave={this.removeHighlight} id={key}>
                    <div className="menu__item__type">{blockType}</div>
                    <div className="menu__item__title">{blockTitle}</div>
                  </a>
                </div>
              );
            })}

            <div className="block-options">
              <button className="fabricator-btn fabricator-btn--blue fabricator-btn__icon--left fabricator-btn__icon-add" onClick={() => this.changeView('addBlock')}>
                Add a block
              </button>
            </div>
          </div>
        </div>
      );
    };

    const renderControls = () => {

      const getBlockType = () => {
        if (this.state.editBlockInfo.Type) {
          return this.state.editBlockInfo.Type.value;
        }
        return 'New Block';
      };

      if (this.state.viewState === 'editBlock' || this.state.viewState === 'addBlock') {
        return (
          <div className="header__controls">
            <div className="options">
              <div className="title">Edit</div>
              <button className="fabricator-btn fabricator-btn--bg-none fabricator-btn--right fabricator-btn__icon-close fabricator-btn__icon--left" onClick={() => this.changeView('home', true)}>
                Cancel
              </button>
            </div>
            <div className="title">{ getBlockType() }</div>
          </div>
        );
      }

      return (
        <div className="header__content">
          <h3>{websiteTitle}</h3>
          <a href="/">View site tree</a>
        </div>
      );
    };

    // this needs to change
    const renderBlockView = () => {
      const { viewState } = this.state;
      const elementAreaId = this.state.pageFields.ElementalAreaID.value;

      if (viewState === 'home') {
        return renderHomeView();
      }

      if (viewState === 'settings') {
        return <PageSettings settings={[]} />;
      }

      if (viewState === 'addBlock') {
        return <NewBlock elementAreaId={elementAreaId} />;
      }

      return (
        <ViewBlock blockInfo={this.state.editBlockInfo} />
      );
    };

    return (
      <div>
        <div className={`fabricator-overlay ${this.state.viewState === 'editBlock' ? 'shown' : ''}`} />

        <div className="fabricator">
          <div className="fabricator__header">
            <div className="header__actions">
              <a href="/" className="username">{ this.state.username }</a>

              <div className="header__links">
                <a href={`/admin/pages/edit/show/${this.state.pageFields.ID.value}`} rel="noreferrer" target="_blank">Open CMS</a>
                <span className="divider">|</span>
                <a href="/Security/logout">Logout</a>
              </div>
            </div>

            { renderControls() }
          </div>
          { renderBlockView() }

          <div className="fabricator__settings">
            <button className="fabricator-btn fabricator-btn--default fabricator-btn__icon--left fabricator-btn__icon-settings">
              Page settings
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Fabric;
