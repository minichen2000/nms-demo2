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
        assertEquals(10, Utils.extractType(1101L));
        assertEquals(0, Utils.extractType(100121L));
        assertEquals(99, Utils.extractType(199120000000001L));

        assertEquals(121L, Utils.extractId(100121L));
        assertEquals(999900000001L, Utils.extractId(100999900000001L));
        assertEquals(0L, Utils.extractId(100000000000000L));
        assertEquals(0L, Utils.extractId(1000L));


        assertEquals(1001234L, Utils.genObjectFullId(0, 1234L));
        assertEquals(1011234L, Utils.genObjectFullId(1, 1234L));
        assertEquals(1991234L, Utils.genObjectFullId(99, 1234L));
        assertEquals(102123456789L, Utils.genObjectFullId(2, 123456789L));
        assertEquals(-1L, Utils.genObjectFullId(100, 123456789L));

        assertEquals(-1L, Utils.genNEFullId(1000, 123));
        assertEquals(1001001L, Utils.genNEFullId(100, 1));
        assertEquals(1009991L, Utils.genNEFullId(999, 1));
        assertEquals(100101123L, Utils.genNEFullId(101, 123));
        assertEquals(10010010L, Utils.genNEFullId(100, 10));

        assertEquals(123, Utils.extractNeId(100101123L));
        assertEquals(3, Utils.extractNeId(1009993L));
        assertEquals(-1, Utils.extractNeId(1019993L));

        assertEquals(101, Utils.extractNeGroupId(100101123L));
        assertEquals(999, Utils.extractNeGroupId(1009993L));
        assertEquals(-1, Utils.extractNeGroupId(1019993L));

    }

    @Test
    public void testGenNewId() throws Exception {
        assertEquals(1000L, (long)Utils.genNewId(0));
        assertEquals(1110L, (long)Utils.genNewId(11));
        assertEquals(-1, (long)Utils.genNewId(12));


        assertEquals(-1, (long)Utils.genNewNeId(1000));
        assertEquals(0, (long)Utils.genNewNeId(999));
        assertEquals(1, (long)Utils.genNewNeId(999));
        assertEquals(0, (long)Utils.genNewNeId(100));
        assertEquals(1, (long)Utils.genNewNeId(100));
        assertNotEquals(-1, (long)Utils.genNewNeId(100));
    }
}