package org.nmsdemo.utils;

import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by junyuel on 2016/4/6.
 */
public class UtilsTest {

    @Test
    public void testObjectId() throws Exception {
        assertEquals(1, Utils.extractType(101120000000001L));
        assertEquals(10, Utils.extractType(110120000000001L));
        assertEquals(0, Utils.extractType(100120000000001L));
        assertEquals(99, Utils.extractType(199120000000001L));

        assertEquals(120000000001L, Utils.extractId(100120000000001L));
        assertEquals(999900000001L, Utils.extractId(100999900000001L));
        assertEquals(0L, Utils.extractId(100000000000000L));

        assertEquals(999999999999L, Utils.genObjectId12(999999999999L));
        assertEquals(-1L, Utils.genObjectId12(999999999999L+1));
        assertEquals(999999999998L, Utils.genObjectId12(999999999999L-1));
        assertEquals(1234L, Utils.genObjectId12(1234L));

        assertEquals(100000000001234L, Utils.genObjectFullId(0, 1234L));
        assertEquals(101000000001234L, Utils.genObjectFullId(1, 1234L));
        assertEquals(199000000001234L, Utils.genObjectFullId(99, 1234L));
        assertEquals(102000123456789L, Utils.genObjectFullId(2, 123456789L));
        assertEquals(-1L, Utils.genObjectFullId(100, 123456789L));

        assertEquals(-1L, Utils.genNEFullId(1000, 123));
        assertEquals(100100000000001L, Utils.genNEFullId(100, 1));
        assertEquals(100999000000001L, Utils.genNEFullId(999, 1));
        assertEquals(100101000000123L, Utils.genNEFullId(101, 123));
        assertEquals(100100000000010L, Utils.genNEFullId(100, 10));

        assertEquals(123, Utils.extractNeId(100101000000123L));
        assertEquals(3, Utils.extractNeId(100999000000003L));
        assertEquals(-1, Utils.extractNeId(101999000000003L));

        assertEquals(101, Utils.extractNeGroupId(100101000000123L));
        assertEquals(999, Utils.extractNeGroupId(100999000000003L));
        assertEquals(-1, Utils.extractNeGroupId(101999000000003L));

    }

    @Test
    public void testGenNewId() throws Exception {
        assertEquals(100000000000000L, (long)Utils.genNewId(0));
        assertEquals(111000000000000L, (long)Utils.genNewId(11));
        assertEquals(-1, (long)Utils.genNewId(12));


        assertEquals(-1, (long)Utils.genNewNeId(1000));
        assertEquals(0, (long)Utils.genNewNeId(999));
        assertEquals(1, (long)Utils.genNewNeId(999));
        assertEquals(0, (long)Utils.genNewNeId(100));
        assertEquals(1, (long)Utils.genNewNeId(100));
        assertNotEquals(-1, (long)Utils.genNewNeId(100));
    }
}