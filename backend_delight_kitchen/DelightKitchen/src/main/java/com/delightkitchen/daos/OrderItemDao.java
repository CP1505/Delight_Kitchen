package com.delightkitchen.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.delightkitchen.entities.OrderItem;

@Repository
public interface OrderItemDao extends JpaRepository<OrderItem, Integer> {

	List<OrderItem> findByOrderItemOrder_OrderId(int id);

	OrderItem findByOrderItemId(int id);
}
