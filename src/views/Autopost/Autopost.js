import React from 'react';
import { Form, Select } from 'antd';
const Option = Select.Option;

function groupOptions(groups) {
  return groups.map(g => <Option key={g.id}>{g.name}</Option>);
}

function Autopost({ groups }) {
  if (groups.length === 0) {
    return <p>It seems like there are no groups you're managing.</p>;
  }
  return (
    <Form>
      <div style={{ width: 240 }}>
        <Form.Item>
          <Select defaultValue={groups[0].name}>{groupOptions(groups)}</Select>
        </Form.Item>
      </div>
    </Form>
  );
}

export default Autopost;
