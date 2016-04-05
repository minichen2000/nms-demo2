package org.nmsdemo.utils;

import org.nmsdemo.dao.MDL_NEDao;
import org.nmsdemo.model.MDL_NE;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

/**
 * Created by Chen on 2016/4/3.
 */
public class JPAUtils {



    static public void testNE() {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
                "applicationContext.xml");
        MDL_NEDao dao = context.getBean(MDL_NEDao.class);

        MDL_NE ne1=new MDL_NE(10010001L, 100, "Q3", 21, "node1", "cd", "1660sm", "", "7.1", "", "", "", "suppervised", "available", "cleared");
        MDL_NE ne2=new MDL_NE(10010001L, 101, "DEX", 22, "node2", "cd", "1678mc", "", "7.2", "", "", "", "unsuppervised", "unavailable", "major");
        // Add new Person records
        dao.save(ne1);
        dao.save(ne2);

        // Count Person records
        System.out.println("Count Person records: " + dao.count());

        // Print all records
        List<MDL_NE> nes = (List<MDL_NE>) dao.findAll();
        for (MDL_NE ne : nes) {
            System.out.println(ne);
        }

        // Find Person by surname
        System.out.println("Find by neGroupId 100 neId 21: " + dao.findByNeIdAndNeGroupId(21L, 100L));

        context.close();
    }
}

