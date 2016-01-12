'use strict';

// demo data
var mapData = {
	name: '地图',
	type: 'map-cate'
};
var tlData = {
	name: '物理连接',
	type: 'tl-cate'
};
var trailData = {
	name: '子网连接',
	type: 'trail-cate'
};
var pathData = {
	name: '端到端电路',
	type: 'path-cate'
};
var evcData = {
	name: '以太网电路',
	type: 'evc-cate',
	children: [{
		name: 'ETS电路',
		type: 'evc-ets-cate'
	},{
		name: 'ETB电路',
		type: 'evc-etb-cate'
	}
	]
};
var neData = {
	name: '网元',
	type: 'ne-cate',
	children: [{
		name: '网元组100',
		type: 'ne-group',
		subtype: 'q3',
		children: [{
			name: 'node1-1660sm',
			type: 'ne',
			subtype: '1660sm'
		},
		{
			name: 'node2-1660sm',
			type: 'ne',
			subtype: '1660sm'
		},
		{
			name: 'node3-1642emc',
			type: 'ne',
			subtype: '1642emc'
		}]
	},
	{
		name: '网元组101',
		type: 'ne-group',
		subtype: 'dex',
		children: [{
			name: 'node4-1678',
			type: 'ne',
			subtype: '1678'
		},
		{
			name: 'node5-1678',
			type: 'ne',
			subtype: '1678'
		},
		{
			name: 'node6-1678',
			type: 'ne',
			subtype: '1678'
		}]
	},
	{
		name: '网元组102',
		type: 'ne-group',
		subtype: 'snmp',
		children: [{
			name: 'node7-es16',
			type: 'ne',
			subtype: 'es16'
		},
		{
			name: 'node8-es8',
			type: 'ne',
			subtype: 'es8'
		}]
	},
	{
		name: '网元组103',
		type: 'ne-group',
		subtype: 'q3'
	}]
};