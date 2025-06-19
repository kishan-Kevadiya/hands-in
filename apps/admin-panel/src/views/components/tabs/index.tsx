import {
  type JSX,
  createSignal,
  children,
  For,
  Match,
  Switch,
  createEffect,
} from "solid-js";

import "./tabs.css";

interface Tab {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab: string;
  selectedTab?: string;
  onTabChange?: (value: string) => void;
  children: JSX.Element;
}

const Tabs = (props: TabsProps) => {
  const [activeTab, setActiveTab] = createSignal(
    props.selectedTab ?? props.defaultTab,
  );
  const tabContent = children(() => props.children);

  // Sync with selectedTab prop if provided
  createEffect(() => {
    if (props.selectedTab !== undefined && props.selectedTab !== activeTab()) {
      setActiveTab(props.selectedTab);
    }
  });

  const handleTabClick = (value: string) => {
    props.onTabChange?.(value);
  };

  return (
    <div class="tabs-wrapper">
      <div class="tabs-header">
        <For each={props.tabs}>
          {(tab, _index) => (
            <button
              class={`tab-button ${tab.value === activeTab() ? "active" : ""}`}
              onClick={() => handleTabClick(tab.value)}
            >
              {tab.label}
            </button>
          )}
        </For>
      </div>

      <div class="tabs-content">
        <Switch fallback={<div>No content</div>}>
          <For each={props.tabs}>
            {(tab, index) => (
              <Match when={tab.value === activeTab()}>
                {tabContent.toArray()[index()]}
              </Match>
            )}
          </For>
        </Switch>
      </div>
    </div>
  );
};

export default Tabs;
