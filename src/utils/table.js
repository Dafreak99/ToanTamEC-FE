const isEdited = (row) => {
  return row.some((col) => col?.edited);
};

export const processTableData = (tableData) => {
  const headings = [];
  let expandableContent = {};

  headings.push(...tableData[0]);

  let currentContent;
  for (let i = 1; i < tableData.length; i++) {
    // content location
    if (tableData[i][0]?.value.match(/^[1-9]\//)) {
      currentContent = tableData[i][0];
      expandableContent = {
        ...expandableContent,
        [currentContent.value]: [],
      };
    } else {
      expandableContent[currentContent.value].push(tableData[i]);
    }
  }

  // Calculate the last 3 rows of each location
  const keys = Object.keys(expandableContent);

  for (const key of keys) {
    const length = expandableContent[key][0]?.length || 0;
    const totalArr = [].fill(length);
    const implementedArr = [].fill(length);
    const restArr = [].fill(length);

    totalArr[0] = { value: 'Tổng' };
    implementedArr[0] = { value: 'Đã thi công' };
    restArr[0] = { value: 'Còn lại' };

    for (let i = 1; i < length; i++) {
      let total = 0;
      let implemented = 0;
      let rest = 0;

      for (const element of expandableContent[key]) {
        if (element?.[i] && !isEdited(element)) {
          // count implemented stuff
          if (element[i].status === 'passed') {
            implemented += parseFloat(element[i].value);
          }
          total += parseFloat(element[i].value);
        }
        rest = total - implemented;
      }

      totalArr[i] = { value: total };
      implementedArr[i] = { value: implemented };
      restArr[i] = { value: rest };
    }
    expandableContent[key].push(totalArr, implementedArr, restArr);
  }

  const expandableHeadings = [];
  let isParent = false;
  let countExpandableHeadings = 0;

  headings.forEach((heading, index) => {
    if (heading.match(/^[MDCLXVI]{0,}\./)) {
      expandableHeadings.push({
        type: 'parent',
        value: heading,
        children: [],
        count: index,
      });
      isParent = true;
      countExpandableHeadings++;
    } else if (isParent) {
      expandableHeadings[expandableHeadings.length - 1].children.push({
        type: 'child',
        value: heading,
        count: index,
      });
    } else {
      expandableHeadings.push({
        type: 'child',
        value: heading,
        count: index,
      });
    }
  });

  const rows = tableData.map((row) => row[0]);

  return {
    headings,
    expandableContent,
    expandableHeadings,
    original: tableData,
    rows,
    countExpandableHeadings,
  };
};
