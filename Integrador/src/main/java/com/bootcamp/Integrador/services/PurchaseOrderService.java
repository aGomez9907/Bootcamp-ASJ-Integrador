package com.bootcamp.Integrador.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.Product;
import com.bootcamp.Integrador.models.PurchaseOrder;
import com.bootcamp.Integrador.models.PurchaseOrderDetail;
import com.bootcamp.Integrador.repositories.ProductRepository;
import com.bootcamp.Integrador.repositories.PurchaseOrderRepository;

import jakarta.transaction.Transactional;

@Service
public class PurchaseOrderService {

	@Autowired
	PurchaseOrderRepository purchaseOrderRepository;

	public List<PurchaseOrder> getPurchaseOrders() {
		return purchaseOrderRepository.findAll();
	}

	public Optional<PurchaseOrder> getPurchaseOrderById(Integer id) {
		return purchaseOrderRepository.findById(id);
	}

	@Transactional
	public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder) {
		try {
			purchaseOrder.setCreatedAt(Timestamp.from(Instant.now()));
			purchaseOrder.setUpdatedAt(Timestamp.from(Instant.now()));
			purchaseOrder.setEmissionDate(Timestamp.from(Instant.now()));
			purchaseOrder.setDeleted(false);
			PurchaseOrder resultPurchaseOrder = purchaseOrderRepository.save(purchaseOrder);
			return resultPurchaseOrder;
		}catch(Exception e) {
			throw e;
		}
	}

	public String updatePurchaseOrder(Integer id, PurchaseOrder purchaseOrder) {
		try {
			PurchaseOrder prod = purchaseOrderRepository.findById(id).get();// obtengo la tarea original
			if (prod != null) {
				prod.setDeliveryDate(purchaseOrder.getDeliveryDate());
				prod.setDescription(purchaseOrder.getDescription());
				prod.setEmissionDate(purchaseOrder.getEmissionDate());
				prod.setOrderNumber(purchaseOrder.getOrderNumber());
				prod.setStatusId(purchaseOrder.getStatusId());
				prod.setSupplierId(purchaseOrder.getSupplierId());
				prod.setUpdatedAt(Timestamp.from(Instant.now()));
				purchaseOrderRepository.save(prod);
				return "PurchaseOrder with id: " + id + " updated successfully.";
			}
			return "Error: The purchaseOrder is null.";

		} catch (Exception err) {
			return "Error: The purchaseOrder couldn´t be found.";
		}

	}

	public PurchaseOrder deletePurchaseOrder(Integer id) {
		try {
			PurchaseOrder prod =  purchaseOrderRepository.findById(id).get();
			prod.setDeleted(true);
			purchaseOrderRepository.save(prod);
			return purchaseOrderRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public PurchaseOrder recoverPurchaseOrder(Integer id) {
		try {
			PurchaseOrder prod =  purchaseOrderRepository.findById(id).get();
			prod.setDeleted(false);
			purchaseOrderRepository.save(prod);
			return purchaseOrderRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
}
