import styles from '../../styles/searchfilter/FilterSection.module.css'
import {Card, Divider, Menu, Button} from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'


export default function FilterSection({}) {
  return(
    <Card className={styles.filterSection}>
      
      {/* <p>Filters</p>
      <p>Clear Filter</p>

      <div className={styles.subFilter}>
        <p>Sort by</p>
        <Divider className={styles.dividerFilter}/>
        <p>Rating - high to low</p>
        <p>Cost - high to low</p>
        <p>Cost - low to high</p>
      </div>

      <div className={styles.subFilter}>
        <p>Location</p>
        <Divider className={styles.dividerFilter}/>
        <p>City 1</p>
        <p>City 2</p>
        <p>City 3</p>
        <p>See all locations</p>
      </div>

      <div className={styles.subFilter}>
        <p>Cuisine</p>
        <Divider className={styles.dividerFilter}/>
        <p>Cuisine 1</p>
        <p>Cuisine 2</p>
        <p>Cuisine 3</p>
        <p>See all cuisines</p>
      </div> */}

      <p>Filters</p>
      <Button>
        Clear Filter
      </Button>

      <Menu 
        mode="inline"
        defaultOpenKeys={['sub1', 'sub2']}
        className={styles.filterMenu}
      >
        <SubMenu key="sub1" title="Sort by">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="Location">
          <Menu.Item key="A">Option A</Menu.Item>
          <Menu.Item key="B">Option B</Menu.Item>
          <Menu.Item key="C">Option C</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title="Cuisines">
          <Menu.Item key="X">Option X</Menu.Item>
          <Menu.Item key="Y">Option Y</Menu.Item>
          <Menu.Item key="Z">Option Z</Menu.Item>
        </SubMenu>


      </Menu>

    </Card>
  )

}