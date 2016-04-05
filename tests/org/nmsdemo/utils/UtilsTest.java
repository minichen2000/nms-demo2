package org.nmsdemo.utils;

import static org.junit.Assert.*;
import static org.junit.Assert.assertEquals;

/**
 * Created by Chen on 2016/4/5.
 */
public class UtilsTest {
    @org.junit.Test
    public void objectIdTest() throws Exception {
        assertEquals(1, Utils.extractType(100101200000000001L));
        assertEquals(100, Utils.extractType(110001200000000001L));
        assertEquals(0, Utils.extractType(100001200000000001L));
        assertEquals(999, Utils.extractType(199901200000000001L));

        assertEquals(1200000000001L, Utils.extractId(100101200000000001L));
        assertEquals(99990000000001L, Utils.extractId(100099990000000001L));
        assertEquals(0L, Utils.extractId(100000000000000000L));

        assertEquals(99999999999999L, Utils.genObjectId14(99999999999999L));
        assertEquals(-1L, Utils.genObjectId14(99999999999999L+1));
        assertEquals(99999999999998L, Utils.genObjectId14(99999999999999L-1));
        assertEquals(1234L, Utils.genObjectId14(1234L));

        assertEquals(100000000000001234L, Utils.genObjectFullId(0, 1234L));
        assertEquals(100100000000001234L, Utils.genObjectFullId(1, 1234L));
        assertEquals(199900000000001234L, Utils.genObjectFullId(999, 1234L));
        assertEquals(100200000123456789L, Utils.genObjectFullId(2, 123456789L));
        assertEquals(-1L, Utils.genObjectFullId(1000, 123456789L));

        assertEquals(-1L, Utils.genNEFullId(1000, 123));
        assertEquals(100001000000000001L, Utils.genNEFullId(100, 1));
        assertEquals(100009990000000001L, Utils.genNEFullId(999, 1));
        assertEquals(100001010000000123L, Utils.genNEFullId(101, 123));

        assertEquals(123, Utils.extractNeId(100001010000000123L));
        assertEquals(3, Utils.extractNeId(100009990000000003L));
        assertEquals(-1, Utils.extractNeId(100109990000000003L));

        assertEquals(101, Utils.extractNeGroupId(100001010000000123L));
        assertEquals(999, Utils.extractNeGroupId(100009990000000003L));
        assertEquals(-1, Utils.extractNeGroupId(100109990000000003L));
    }

}